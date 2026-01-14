'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Edit2, Check, X } from 'lucide-react';

interface Order {
  _id: string;
  orderNumber: string;
  userId: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  payment: {
    mode: 'COD' | 'Prepaid';
    method?: string;
    status: string;
    transactionId?: string;
  };
  trackingNumber?: string;
  createdAt: string;
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', paymentMode: '' });
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.status) params.append('status', filter.status);
      if (filter.paymentMode) params.append('paymentMode', filter.paymentMode);

      const response = await fetch(`/api/admin/orders?${params}`);
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order._id);
    setEditData({
      status: order.status,
      paymentMode: order.payment.mode,
      paymentStatus: order.payment.status,
    });
  };

  const handleSave = async (orderId: string) => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          ...editData,
        }),
      });

      if (response.ok) {
        setEditingOrder(null);
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const getPaymentModeColor = (mode: string) => {
    return mode === 'COD' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={filter.paymentMode}
          onChange={(e) => setFilter({ ...filter, paymentMode: e.target.value })}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Payment Modes</option>
          <option value="COD">Cash on Delivery</option>
          <option value="Prepaid">Online Payment</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Order #</th>
              <th className="border p-3 text-left">Customer</th>
              <th className="border p-3 text-left">Items</th>
              <th className="border p-3 text-right">Total</th>
              <th className="border p-3 text-left">Payment Mode</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Tracking</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="border p-3 font-semibold">{order.orderNumber}</td>
                <td className="border p-3">
                  <div className="text-sm">
                    <div className="font-medium">{order.userId.name}</div>
                    <div className="text-gray-600">{order.userId.phone}</div>
                  </div>
                </td>
                <td className="border p-3 text-sm">
                  {order.items.map((item, i) => (
                    <div key={i}>{item.quantity}x {item.name}</div>
                  ))}
                </td>
                <td className="border p-3 text-right font-semibold">₹{order.total}</td>
                <td className="border p-3">
                  {editingOrder === order._id ? (
                    <select
                      value={editData.paymentMode}
                      onChange={(e) => setEditData({ ...editData, paymentMode: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      <option value="COD">COD</option>
                      <option value="Prepaid">Online</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentModeColor(order.payment.mode)}`}>
                      {order.payment.mode === 'COD' ? 'Cash on Delivery' : 'Online Payment'}
                    </span>
                  )}
                </td>
                <td className="border p-3">
                  {editingOrder === order._id ? (
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  )}
                </td>
                <td className="border p-3 text-sm">
                  {order.trackingNumber ? (
                    <div>
                      <div className="font-mono text-xs">{order.trackingNumber}</div>
                      <a href={`https://track.delhivery.com/track/package/${order.trackingNumber}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">
                        Track
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="border p-3 text-center">
                  {editingOrder === order._id ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleSave(order._id)}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                        title="Save"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => setEditingOrder(null)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                        title="Cancel"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(order)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No orders found
        </div>
      )}
    </div>
  );
}
