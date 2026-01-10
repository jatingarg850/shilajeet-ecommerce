import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is admin
    if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Fetch all orders with Delhivery tracking
    const orders = await Order.find({
      shippingProvider: 'delhivery',
      trackingNumber: { $exists: true, $ne: null }
    });

    // Calculate stats
    const totalShipments = orders.length;
    const deliveredShipments = orders.filter(o => o.trackingStatus === 'delivered').length;
    const inTransitShipments = orders.filter(o => o.trackingStatus === 'in_transit').length;
    const pendingShipments = orders.filter(o => o.trackingStatus === 'pending').length;
    const failedShipments = orders.filter(o => o.trackingStatus === 'failed').length;

    // Calculate delivery rate
    const deliveryRate = totalShipments > 0 ? (deliveredShipments / totalShipments) * 100 : 0;

    // Calculate average delivery time (in days)
    let averageDeliveryTime = 0;
    const deliveredOrders = orders.filter(o => o.trackingStatus === 'delivered');
    
    if (deliveredOrders.length > 0) {
      const totalDays = deliveredOrders.reduce((sum, order) => {
        const createdDate = new Date(order.createdAt);
        const updatedDate = new Date(order.updatedAt);
        const days = (updatedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
        return sum + days;
      }, 0);
      averageDeliveryTime = totalDays / deliveredOrders.length;
    }

    return NextResponse.json({
      totalShipments,
      deliveredShipments,
      inTransitShipments,
      pendingShipments,
      failedShipments,
      deliveryRate,
      averageDeliveryTime,
    });
  } catch (error) {
    console.error('Error fetching Delhivery stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Delhivery stats' },
      { status: 500 }
    );
  }
}
