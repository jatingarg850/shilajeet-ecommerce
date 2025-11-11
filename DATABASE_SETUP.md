# Database Setup - Agnishila Shilajit Store

## ✅ Database Successfully Populated!

Your MongoDB Atlas database has been set up and populated with sample data.

### 📊 Database Contents

#### Products (3 items)
1. **Pure Himalayan Shilajit Resin** - ₹2,499 (Featured)
2. **Shilajit Gold Capsules** - ₹1,999 (Featured)
3. **Premium Shilajit Powder** - ₹1,799

#### Users (3 accounts)
- 1 Admin account
- 2 Customer accounts

#### Orders (3 orders)
- Sample orders with different statuses (delivered, processing, confirmed)

#### Newsletter Subscribers (4 subscribers)
- Active email subscribers

---

## 🔐 Login Credentials

### Admin Access
- **Email:** admin@agnishila.com
- **Password:** admin123
- **Access:** `/admin/login`

### Test Customer Account
- **Email:** john@example.com
- **Password:** password123

---

## 🗄️ Database Connection

**MongoDB URI:** 
```
mongodb+srv://developerduco:p2nDgP07paBQewdi@cluster0.sms0okt.mongodb.net/shilajit-store?retryWrites=true&w=majority&appName=Cluster0
```

**Database Name:** `shilajit-store`

---

## 📝 Collections

### 1. Products
- Product details with images, pricing, and descriptions
- Categories: Resin, Capsules, Powder
- Featured products marked
- Stock status tracking

### 2. Users
- Admin and customer accounts
- Hashed passwords (bcrypt)
- Role-based access (admin/user)

### 3. Orders
- Order tracking with unique order numbers
- Customer information
- Shipping addresses
- Payment status
- Order status (confirmed, processing, shipped, delivered)

### 4. Newsletter
- Email subscribers
- Subscription status
- Subscription dates

---

## 🚀 How to Use

### 1. Start Development Server
```bash
npm run dev
```

### 2. Access Admin Panel
1. Go to `http://localhost:3000/admin/login`
2. Login with admin credentials
3. Access dashboard at `http://localhost:3000/admin`

### 3. Browse Store
- Homepage: `http://localhost:3000`
- Products: `http://localhost:3000/products`
- Individual Product: `http://localhost:3000/products/[slug]`

---

## 🔄 Re-seed Database

If you need to reset the database with fresh sample data:

```bash
npm run seed
```

This will:
- Clear all existing data
- Insert fresh sample data
- Reset all collections

---

## 📦 What's Included

### Sample Products Include:
- High-quality product images (placeholders)
- Detailed descriptions
- Benefits and ingredients
- Usage instructions
- Certifications
- Customer ratings and reviews

### Sample Orders Include:
- Different order statuses
- Complete shipping information
- Payment details
- Order history

### Admin Features:
- Dashboard with statistics
- Order management
- Product management
- Customer management
- Newsletter management

---

## 🛠️ Next Steps

1. **Replace Product Images:** Update product images in `/public/images/products/`
2. **Configure Razorpay:** Test payment integration with your Razorpay account
3. **Customize Products:** Add more products or modify existing ones
4. **Email Setup:** Configure email notifications for orders
5. **Deploy:** Deploy to production when ready

---

## 📞 Support

For any issues or questions:
- Check the console for error messages
- Verify MongoDB connection in `.env` file
- Ensure all dependencies are installed: `npm install`

---

## 🎉 You're All Set!

Your Agnishila Shilajit ecommerce store is now ready with:
- ✅ MongoDB Atlas connection
- ✅ Sample products
- ✅ Admin account
- ✅ Test orders
- ✅ Newsletter subscribers

Start your dev server and begin customizing your store!
