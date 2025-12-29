import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import FireCoins from '@/models/FireCoins';
import Coupon from '@/models/Coupon';
import { calculateTotalFireCoins } from '@/lib/fireCoins';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items, address, payment, couponCode, idempotencyKey } = await request.json();

    if (!items || !address || !payment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    // Check for duplicate order using idempotency key
    if (idempotencyKey) {
      const existingOrder = await Order.findOne({ 
        userId: session.user.id,
        idempotencyKey 
      });
      
      if (existingOrder) {
        return NextResponse.json({
          success: true,
          order: {
            orderNumber: existingOrder.orderNumber,
            total: existingOrder.total,
            status: existingOrder.status,
            estimatedDelivery: new Date(existingOrder.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000),
          }
        });
      }
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const tax = 0; // No tax
    const shipping = 0; // Free shipping
    
    // Handle coupon if provided
    let discountAmount = 0;
    let appliedCoupon = null;
    
    if (couponCode) {
      appliedCoupon = await Coupon.findOne({ code: couponCode.toUpperCase(), active: true });
      
      if (appliedCoupon) {
        // Check if coupon is still valid
        if (appliedCoupon.expiryDate && new Date(appliedCoupon.expiryDate) < new Date()) {
          return NextResponse.json({ error: 'Coupon has expired' }, { status: 400 });
        }
        
        if (appliedCoupon.maxUses && appliedCoupon.usedBy.length >= appliedCoupon.maxUses) {
          return NextResponse.json({ error: 'Coupon usage limit reached' }, { status: 400 });
        }
        
        if (subtotal < appliedCoupon.minOrderAmount) {
          return NextResponse.json({ error: 'Minimum order amount not met' }, { status: 400 });
        }
        
        // Calculate discount
        if (appliedCoupon.discountType === 'percentage') {
          discountAmount = (subtotal * appliedCoupon.discountValue) / 100;
          if (appliedCoupon.maxDiscount) {
            discountAmount = Math.min(discountAmount, appliedCoupon.maxDiscount);
          }
        } else {
          discountAmount = appliedCoupon.discountValue;
        }
      }
    }
    
    const calculatedTotal = Math.max(0, subtotal + tax + shipping - discountAmount);

    // Determine payment method and transaction details
    const isRazorpayPayment = payment.razorpayData && payment.razorpayData.verified;
    
    const paymentInfo = isRazorpayPayment
      ? {
          cardNumber: 'Razorpay Payment',
          cardholderName: payment.razorpayData.userDetails?.name || 'Razorpay User',
          paymentMethod: 'Razorpay',
          transactionId: payment.razorpayData.paymentId,
        }
      : {
          cardNumber: payment.cardNumber || 'N/A',
          cardholderName: payment.cardholderName || 'N/A',
          paymentMethod: 'Credit Card',
          transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };

    // Generate order number
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const orderNumber = `AG${timestamp.slice(-6)}${random}`;

    // Create order
    const order = new Order({
      orderNumber,
      userId: session.user.id,
      idempotencyKey,
      items: items.map((item: any) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        variant: item.variant,
      })),
      shippingAddress: address,
      billingAddress: payment.billingAddress?.sameAsShipping ? address : payment.billingAddress,
      payment: paymentInfo,
      subtotal,
      tax,
      shipping,
      couponCode: couponCode || undefined,
      discountAmount,
      total: calculatedTotal,
      status: 'confirmed',
    });

    await order.save();

    // Update coupon usage if applied
    if (appliedCoupon) {
      await Coupon.findByIdAndUpdate(
        appliedCoupon._id,
        {
          $push: {
            usedBy: {
              userId: session.user.id,
              orderId: order._id.toString(),
              usedAt: new Date(),
            },
          },
        }
      );
    }

    // Clear user's cart after successful order
    await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { $set: { items: [] } }
    );

    // Award Fire Coins for the purchase
    try {
      const coinsToEarn = calculateTotalFireCoins(items.map((item: any) => ({
        id: item.id,
        quantity: item.quantity
      })));

      if (coinsToEarn > 0) {
        let fireCoins = await FireCoins.findOne({ userId: session.user.email });
        
        if (!fireCoins) {
          fireCoins = new FireCoins({
            userId: session.user.email,
            balance: 0,
            transactions: []
          });
        }

        fireCoins.transactions.push({
          type: 'earned',
          amount: coinsToEarn,
          orderId: order.orderNumber,
          description: `Earned ${coinsToEarn} Fire Coins from order ${order.orderNumber}`,
          createdAt: new Date()
        });

        fireCoins.balance += coinsToEarn;
        await fireCoins.save();

        console.log(`Awarded ${coinsToEarn} Fire Coins to user ${session.user.email} for order ${order.orderNumber}`);
      }
    } catch (coinError) {
      console.error('Error awarding Fire Coins:', coinError);
      // Don't fail the order if Fire Coins award fails
    }

    // Send order confirmation email (simulate)
    console.log(`Order confirmation email sent for order ${order.orderNumber}`);

    return NextResponse.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        total: order.total,
        status: order.status,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const orders = await Order.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .select('-payment.cardNumber -payment.transactionId'); // Exclude sensitive payment info

    return NextResponse.json(orders);

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}