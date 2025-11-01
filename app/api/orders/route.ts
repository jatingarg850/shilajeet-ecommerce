import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Cart from '@/models/Cart';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items, address, payment, total } = await request.json();

    if (!items || !address || !payment || !total) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = 0; // Free shipping
    const calculatedTotal = subtotal + tax + shipping;

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
      total: calculatedTotal,
      status: 'confirmed',
    });

    await order.save();

    // Clear user's cart after successful order
    await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { $set: { items: [] } }
    );

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