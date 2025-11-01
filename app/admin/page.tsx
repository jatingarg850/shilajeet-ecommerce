'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  Package,
  IndianRupee,
  Eye,
  ArrowUp,
  ArrowDown,
  Mail
} from 'lucide-react';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  totalSubscribers: number;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  subscribersGrowth: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  status: string;
  date: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 3,
    totalSubscribers: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    customersGrowth: 0,
    subscribersGrowth: 0,
  });
  
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch orders to calculate stats
      const ordersResponse = await fetch('/api/admin/orders');
      const orders = ordersResponse.ok ? await ordersResponse.json() : [];
      
      // Fetch customers
      const customersResponse = await fetch('/api/admin/customers');
      const customers = customersResponse.ok ? await customersResponse.json() : [];

      // Fetch newsletter subscribers
      const newsletterResponse = await fetch('/api/admin/newsletter?limit=1');
      const newsletterData = newsletterResponse.ok ? await newsletterResponse.json() : { statistics: { total: 0 } };

      // Calculate stats
      const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);
      const totalOrders = orders.length;
      const totalCustomers = customers.length;
      const totalSubscribers = newsletterData.statistics.total;

      // Mock growth data (in real app, compare with previous period)
      const mockStats: DashboardStats = {
        totalRevenue,
        totalOrders,
        totalCustomers,
        totalProducts: 3,
        totalSubscribers,
        revenueGrowth: 12.5,
        ordersGrowth: 8.3,
        customersGrowth: 15.2,
        subscribersGrowth: 22.1,
      };

      setStats(mockStats);
      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
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
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
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
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back to Agnishila Admin Panel</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Last updated</div>
          <div className="text-white font-medium">{new Date().toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Total Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-jet-900 border border-white/20 p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary-400/30"></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-400/20 flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-primary-400" />
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <ArrowUp size={16} />
              <span className="text-sm font-bold">{stats.revenueGrowth}%</span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-white mb-1">{formatPrice(stats.totalRevenue)}</div>
          <div className="text-gray-400 text-sm uppercase tracking-wider">Total Revenue</div>
        </motion.div>

        {/* Total Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-jet-900 border border-white/20 p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-blue-400/30"></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-400/20 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <ArrowUp size={16} />
              <span className="text-sm font-bold">{stats.ordersGrowth}%</span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-white mb-1">{stats.totalOrders}</div>
          <div className="text-gray-400 text-sm uppercase tracking-wider">Total Orders</div>
        </motion.div>

        {/* Total Customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-jet-900 border border-white/20 p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-green-400/30"></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-400/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <ArrowUp size={16} />
              <span className="text-sm font-bold">{stats.customersGrowth}%</span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-white mb-1">{stats.totalCustomers}</div>
          <div className="text-gray-400 text-sm uppercase tracking-wider">Total Customers</div>
        </motion.div>

        {/* Total Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-jet-900 border border-white/20 p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-purple-400/30"></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-400/20 flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <span className="text-sm">Active</span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-white mb-1">{stats.totalProducts}</div>
          <div className="text-gray-400 text-sm uppercase tracking-wider">Total Products</div>
        </motion.div>

        {/* Newsletter Subscribers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-jet-900 border border-white/20 p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-orange-400/30"></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-400/20 flex items-center justify-center">
              <Mail className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <ArrowUp size={16} />
              <span className="text-sm font-bold">{stats.subscribersGrowth}%</span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-white mb-1">{stats.totalSubscribers}</div>
          <div className="text-gray-400 text-sm uppercase tracking-wider">Newsletter Subscribers</div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-jet-900 border border-white/20 p-6 relative overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[30px] border-r-transparent border-b-[30px] border-b-primary-400/30"></div>
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Recent Orders</h2>
          <button className="text-primary-400 hover:text-primary-300 font-bold text-sm uppercase tracking-wider transition-colors">
            View All
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">No Orders Yet</h3>
            <p className="text-gray-400">Orders will appear here once customers start purchasing</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 text-gray-400 font-bold uppercase tracking-wider text-sm">Order</th>
                  <th className="text-left py-3 text-gray-400 font-bold uppercase tracking-wider text-sm">Customer</th>
                  <th className="text-left py-3 text-gray-400 font-bold uppercase tracking-wider text-sm">Total</th>
                  <th className="text-left py-3 text-gray-400 font-bold uppercase tracking-wider text-sm">Status</th>
                  <th className="text-left py-3 text-gray-400 font-bold uppercase tracking-wider text-sm">Date</th>
                  <th className="text-left py-3 text-gray-400 font-bold uppercase tracking-wider text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-white font-bold">{order.orderNumber}</td>
                    <td className="py-4 text-gray-300">{order.customerName}</td>
                    <td className="py-4 text-primary-400 font-bold">{formatPrice(order.total)}</td>
                    <td className="py-4">
                      <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-300">{formatDate(order.date)}</td>
                    <td className="py-4">
                      <button className="text-primary-400 hover:text-primary-300 transition-colors">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}