'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Wallet } from 'lucide-react';
import { useRazorpay } from '@/hooks/useRazorpay';
import { useAuth } from '@/contexts/AuthContext';

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: {
    sameAsShipping: boolean;
    address1?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
}

interface PaymentFormProps {
  onComplete: (paymentData: PaymentData & { razorpayData?: any }) => void;
  isProcessing: boolean;
  total: number;
  shippingAddress: any;
}

export default function PaymentForm({ onComplete, isProcessing, total, shippingAddress }: PaymentFormProps) {
  const { user } = useAuth();
  const { isLoaded: razorpayLoaded, isLoading: razorpayLoading, processPayment } = useRazorpay();
  const [formData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      sameAsShipping: true,
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleRazorpayPayment();
  };

  const handleRazorpayPayment = async () => {
    if (!razorpayLoaded) {
      alert('Payment gateway is loading. Please try again.');
      return;
    }

    if (!user || !shippingAddress) {
      alert('User information is missing. Please try again.');
      return;
    }

    const userDetails = {
      name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
      email: shippingAddress.email || user.email || '',
      contact: shippingAddress.phone || '',
    };

    processPayment(
      total,
      userDetails,
      (response) => {
        // Payment successful
        onComplete({
          ...formData,
          razorpayData: response,
        });
      },
      (error) => {
        // Payment failed
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
      },
      () => {
        // Payment dismissed by user
      }
    );
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-jet-900 border border-white/20 p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-primary-400/30"></div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Smartphone className="w-6 h-6 text-primary-400" />
          <h2 className="text-3xl font-bold text-white uppercase tracking-wider">
            Payment Details
          </h2>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-400">
          <Wallet size={16} />
          <span className="text-sm uppercase tracking-wider">Secure</span>
        </div>
      </div>

      {/* Total Amount */}
      <div className="bg-black border border-primary-400/30 p-6 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-lg uppercase tracking-wider">Total Amount</span>
          <span className="text-3xl font-bold text-primary-400">{formatPrice(total)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Razorpay Information */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-black border border-primary-400/30 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Wallet className="w-6 h-6 text-primary-400" />
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">
              Secure Payment with Razorpay
            </h4>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-jet-900 border border-white/10">
              <div className="text-primary-400 font-bold text-sm mb-1">UPI</div>
              <div className="text-gray-400 text-xs">Google Pay, PhonePe, Paytm</div>
            </div>
            <div className="p-3 bg-jet-900 border border-white/10">
              <div className="text-primary-400 font-bold text-sm mb-1">Cards</div>
              <div className="text-gray-400 text-xs">Visa, Mastercard, RuPay</div>
            </div>
            <div className="p-3 bg-jet-900 border border-white/10">
              <div className="text-primary-400 font-bold text-sm mb-1">Wallets</div>
              <div className="text-gray-400 text-xs">Paytm, Mobikwik, Freecharge</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-primary-400/10 border border-primary-400/30">
            <p className="text-primary-300 text-sm text-center">
              Click "Pay with Razorpay" to proceed to secure payment gateway
            </p>
          </div>
        </motion.div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing || (!razorpayLoaded || razorpayLoading)}
          className="w-full bg-primary-400 text-black py-4 font-bold uppercase tracking-wider text-sm hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing || razorpayLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <Smartphone size={16} />
              <span>Pay with Razorpay - {formatPrice(total)}</span>
            </>
          )}
        </button>

        {/* Payment Method Status */}
        {!razorpayLoaded && (
          <div className="text-center">
            <p className="text-yellow-400 text-sm">Loading payment gateway...</p>
          </div>
        )}

        {/* Security Notice */}
        <div className="text-center pt-4">
          <p className="text-gray-400 text-xs">
            Your payment information is encrypted and secure. We never store your card details.
          </p>
        </div>
      </form>
    </motion.div>
  );
}