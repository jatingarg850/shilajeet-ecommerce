import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import delhiveryService from '@/lib/delhivery';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    await dbConnect();

    // Get order details
    const order = await Order.findOne({ orderNumber: orderId });
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check if shipment already created
    if (order.trackingNumber) {
      return NextResponse.json({
        success: true,
        waybill: order.trackingNumber,
        trackingUrl: `https://track.delhivery.com/tracking/${order.trackingNumber}`,
        message: 'Shipment already created'
      });
    }

    // Create shipment with Delhivery
    const shipmentData = {
      orderId: order.orderNumber,
      customerName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
      customerPhone: order.shippingAddress.phone,
      customerEmail: order.shippingAddress.email,
      deliveryAddress: `${order.shippingAddress.address1}${order.shippingAddress.address2 ? ', ' + order.shippingAddress.address2 : ''}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`,
      deliveryPin: order.shippingAddress.zipCode,
      weight: 0.5, // Default weight for products
      paymentMode: order.payment.paymentMethod === 'Razorpay' ? 'Prepaid' : 'COD',
    };

    const result = await delhiveryService.createShipment(shipmentData);

    // Save waybill to order
    order.trackingNumber = result.waybill;
    order.shippingProvider = 'delhivery';
    order.trackingStatus = 'pending';
    await order.save();

    return NextResponse.json({
      success: true,
      waybill: result.waybill,
      trackingUrl: `https://track.delhivery.com/tracking/${result.waybill}`,
    });
  } catch (error) {
    console.error('Error creating shipment:', error);
    return NextResponse.json({ error: 'Failed to create shipment' }, { status: 500 });
  }
}
