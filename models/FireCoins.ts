import mongoose from 'mongoose';

const FireCoinsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  transactions: [{
    type: {
      type: String,
      enum: ['earned', 'redeemed'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    orderId: {
      type: String,
      required: true
    },
    description: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Ensure one document per user
FireCoinsSchema.index({ userId: 1 }, { unique: true });

export default mongoose.models.FireCoins || mongoose.model('FireCoins', FireCoinsSchema);
