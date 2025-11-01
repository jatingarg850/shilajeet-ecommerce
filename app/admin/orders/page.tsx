'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Truck,
  Package,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: string;
  date: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: any;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      if (response.ok) {
        const ordersData = await response.json();
        setOrders(ordersData);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string, trackingNumber?: string) => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: newStatus,
          trackingNumber,
        }),
      });

      if (response.ok) {
        fetchOrders(); // Refresh orders
        setShowOrderModal(false);
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'processing':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'shipped':
        return 'text-primary-400 bg-primary-400/20 border-primary-400/30';
      case 'delivered':
        return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/30';
      case 'cancelled':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'processing':
        return <Clock size={16} />;
      case 'shipped':
        return <Truck size={16} />;
      case 'delivered':
        return <Package size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider">Orders Management</h1>
          <p className="text-gray-400 mt-1">Manage and track all customer orders</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-400">{orders.length}</div>
          <div className="text-gray-400 text-sm">Total Orders</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-jet-900 border border-white/20 p-6">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders, customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-white/20 text-white pl-10 pr-4 py-3 focus:border-primary-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-black border border-white/20 text-white pl-10 pr-4 py-3 focus:border-primary-400 focus:outline-none transition-colors appearance-none"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-end">
            <span className="text-gray-400">
              Showing {filteredOrders.length} of {orders.length} orders
            </span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-jet-900 border border-white/20 overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">No Orders Found</h3>
            <p className="text-gray-400">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Orders will appear here once customers start purchasing'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black border-b border-white/20">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-400 font-bold uppercase tracking-wider text-sm">Order</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-bold uppercase tracking-wider text-sm">Customer</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-bold uppercase tracking-wider text-sm">Total</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-bold uppercase tracking-wider text-sm">Status</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-bold uppercase tracking-wider text-sm">Date</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-bold uppercase tracking-wider text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="text-white font-bold">{order.orderNumber}</div>
                      <div className="text-gray-400 text-sm">{order.items.length} items</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-white">{order.customerName}</div>
                      <div className="text-gray-400 text-sm">{order.customerEmail}</div>
                    </td>
                    <td className="py-4 px-6 text-primary-400 font-bold">{formatPrice(order.total)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center space-x-2 px-3 py-1 text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{formatDate(order.date)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderModal(true);
                          }}
                          className="text-primary-400 hover:text-primary-300 transition-colors p-1"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderModal(true);
                          }}
                          className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                          title="Edit Order"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-jet-900 border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-primary-400/30"></div>
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                  Order Details
                </h2>
                <p className="text-gray-400">{selectedOrder.orderNumber}</p>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Customer & Order Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black border border-white/10 p-4">
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-400">Name:</span> <span className="text-white">{selectedOrder.customerName}</span></div>
                    <div><span className="text-gray-400">Email:</span> <span className="text-white">{selectedOrder.customerEmail}</span></div>
                  </div>
                </div>

                <div className="bg-black border border-white/10 p-4">
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-400">Total:</span> <span className="text-primary-400 font-bold">{formatPrice(selectedOrder.total)}</span></div>
                    <div><span className="text-gray-400">Date:</span> <span className="text-white">{formatDate(selectedOrder.date)}</span></div>
                    <div><span className="text-gray-400">Status:</span> 
                      <span className={`ml-2 inline-flex items-center space-x-1 px-2 py-1 text-xs font-bold uppercase tracking-wider border ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        <span>{selectedOrder.status}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-black border border-white/10 p-4">
                <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
                      <div>
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-gray-400 text-sm">Quantity: {item.quantity}</div>
                      </div>
                      <div className="text-primary-400 font-bold">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update */}
              <div className="bg-black border border-white/10 p-4">
                <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Update Order Status</h3>
                <div className="grid md:grid-cols-4 gap-3">
                  {['confirmed', 'processing', 'shipped', 'delivered'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(selectedOrder.id, status)}
                      className={`py-2 px-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                        selectedOrder.status === status
                          ? 'bg-primary-400 text-black'
                          : 'border border-white/20 text-white hover:border-primary-400 hover:text-primary-400'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}