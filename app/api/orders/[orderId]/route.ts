import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(
    request: NextRequest,
    { params }: { params: { orderId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // Find the order by ID and ensure it belongs to the current user
        const order = await Order.findOne({
            _id: params.orderId,
            userId: session.user.id
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(order);

    } catch (error) {
        console.error('Error fetching order details:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}