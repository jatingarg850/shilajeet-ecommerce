# Complete Authentication Flow Documentation

## 🔐 Authentication System Overview

The Shilajit e-commerce website now has a complete authentication system with database integration, JWT tokens via NextAuth.js, and seamless cart synchronization.

## 🏗️ Architecture Components

### 1. **Database Integration**
- **MongoDB** with Mongoose ODM
- **User Model** with name, email, password, role fields
- **Secure password hashing** with bcryptjs
- **Unique email validation** and constraints

### 2. **Authentication Provider**
- **NextAuth.js** for JWT token management
- **Credentials Provider** for email/password login
- **Session management** with JWT strategy
- **Automatic token refresh** and validation

### 3. **Context Management**
- **AuthContext** for global authentication state
- **CartContext** with authentication-aware cart sync
- **Real-time state updates** across components
- **Loading states** and error handling

### 4. **API Endpoints**
- **POST /api/auth/register** - User registration
- **POST /api/auth/[...nextauth]** - NextAuth handlers
- **GET /api/orders** - User orders (authenticated)
- **Cart APIs** with user association

## 🔄 Complete User Flow

### **Guest User Experience:**
1. **Browse Products** - View products without authentication
2. **Add to Cart** - Items stored in localStorage
3. **Proceed to Checkout** - Prompted to sign in/up
4. **Authentication Required** - Cannot checkout without account
5. **Cart Persistence** - Items remain during auth process

### **Registration Flow:**
1. **Click Sign Up** - Opens authentication modal
2. **Multi-step Form** - Name → Email/Password
3. **Validation** - Client and server-side validation
4. **Account Creation** - Secure password hashing
5. **Auto Login** - Automatic login after registration
6. **Cart Sync** - localStorage cart synced to database
7. **Welcome Experience** - Redirected to appropriate page

### **Login Flow:**
1. **Click Login** - Opens authentication modal
2. **Credentials Entry** - Email and password
3. **Server Validation** - Database verification
4. **JWT Token** - Secure session creation
5. **Cart Merge** - Local cart merged with database cart
6. **State Update** - Global authentication state updated

### **Authenticated User Experience:**
1. **Persistent Login** - JWT token maintains session
2. **Database Cart** - Cart stored in MongoDB
3. **Profile Access** - User dashboard and order history
4. **Secure Checkout** - Full checkout flow available
5. **Order Management** - View and track orders

### **Logout Flow:**
1. **Click Logout** - From profile dropdown or mobile menu
2. **Session Cleanup** - JWT token invalidated
3. **State Reset** - Authentication state cleared
4. **Cart Transition** - Database cart moved to localStorage
5. **Redirect** - Returned to guest experience

## 🛒 Cart Synchronization Logic

### **Guest Cart (localStorage):**
```javascript
// Items stored in browser localStorage
localStorage.setItem('shilajit-cart', JSON.stringify(cartItems));
```

### **Authenticated Cart (Database):**
```javascript
// Items stored in MongoDB with user association
Cart.findOne({ userId: session.user.id });
```

### **Sync Process:**
1. **Login Detection** - AuthContext monitors authentication state
2. **Local Cart Check** - Checks for existing localStorage items
3. **Database Query** - Fetches user's database cart
4. **Merge Logic** - Combines local and database items
5. **Database Update** - Saves merged cart to database
6. **Local Cleanup** - Clears localStorage after sync

## 🔒 Security Features

### **Password Security:**
- **bcryptjs hashing** with salt rounds (12)
- **Minimum length validation** (6 characters)
- **No plain text storage** in database

### **Session Security:**
- **JWT tokens** with secure secrets
- **Automatic expiration** and refresh
- **Server-side validation** on protected routes
- **CSRF protection** via NextAuth.js

### **Data Validation:**
- **Email format validation** (client and server)
- **Required field validation** for all forms
- **SQL injection prevention** via Mongoose
- **XSS protection** through React's built-in escaping

### **API Security:**
- **Authentication middleware** on protected routes
- **User session verification** for all user operations
- **Rate limiting** (can be added)
- **HTTPS enforcement** (production)

## 🎨 UI/UX Features

### **Authentication Modal:**
- **Multi-step signup** with smooth animations
- **Real-time validation** with error display
- **Loading states** during API calls
- **Responsive design** for all devices
- **Professional branding** consistent with site

### **User Profile:**
- **Profile dropdown** with user info and avatar
- **Order history** with status tracking
- **Account management** options
- **Premium member** status display
- **Quick actions** for common tasks

### **Navigation Integration:**
- **Dynamic navbar** showing auth state
- **Cart count** with loading indicators
- **Mobile menu** with auth options
- **Profile access** from multiple entry points

## 🧪 Testing Scenarios

### **Registration Testing:**
1. **Valid Registration** - All fields correct
2. **Duplicate Email** - Error handling
3. **Weak Password** - Validation messages
4. **Network Errors** - Graceful failure
5. **Form Validation** - Client-side checks

### **Login Testing:**
1. **Valid Credentials** - Successful login
2. **Invalid Email** - Error message
3. **Wrong Password** - Security message
4. **Non-existent User** - Appropriate feedback
5. **Session Persistence** - Refresh behavior

### **Cart Sync Testing:**
1. **Guest to User** - localStorage to database
2. **User to Guest** - Database to localStorage
3. **Multiple Devices** - Cross-device sync
4. **Network Failures** - Fallback behavior
5. **Concurrent Updates** - Race condition handling

### **Checkout Flow Testing:**
1. **Guest Checkout** - Auth requirement
2. **User Checkout** - Full flow completion
3. **Payment Integration** - Razorpay with auth
4. **Order Creation** - Database persistence
5. **Cart Clearing** - Post-order cleanup

## 🚀 Production Considerations

### **Environment Variables:**
```env
MONGODB_URI=mongodb://localhost:27017/shilajit-website
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret-key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### **Database Setup:**
1. **MongoDB Atlas** or self-hosted MongoDB
2. **Connection pooling** for performance
3. **Indexes** on email and user ID fields
4. **Backup strategy** for user data
5. **GDPR compliance** considerations

### **Security Checklist:**
- [ ] Strong NEXTAUTH_SECRET in production
- [ ] HTTPS enabled for all routes
- [ ] Rate limiting on auth endpoints
- [ ] Input sanitization and validation
- [ ] Error logging without sensitive data
- [ ] Regular security updates
- [ ] Password policy enforcement
- [ ] Account lockout after failed attempts

### **Performance Optimization:**
- [ ] Database query optimization
- [ ] Cart sync debouncing
- [ ] Image optimization for avatars
- [ ] Lazy loading for profile components
- [ ] Caching strategies for user data

## 📊 Monitoring & Analytics

### **Key Metrics:**
- **Registration conversion** rate
- **Login success** rate
- **Cart abandonment** after auth
- **Session duration** and engagement
- **Error rates** by endpoint

### **Logging:**
- **Authentication events** (login/logout/register)
- **Cart sync operations** and failures
- **API errors** with context
- **Performance metrics** for auth flows
- **Security events** and anomalies

## 🔧 Troubleshooting Guide

### **Common Issues:**

1. **"User already exists" Error**
   - Check email uniqueness in database
   - Verify case-insensitive email handling
   - Clear any duplicate entries

2. **Cart Not Syncing**
   - Check authentication state
   - Verify API endpoints are accessible
   - Check localStorage permissions

3. **Session Not Persisting**
   - Verify NEXTAUTH_SECRET is set
   - Check JWT token expiration
   - Ensure cookies are enabled

4. **Registration Failing**
   - Check MongoDB connection
   - Verify password hashing
   - Check required field validation

### **Debug Commands:**
```javascript
// Check authentication state
console.log('Auth State:', useAuth());

// Check cart state
console.log('Cart State:', useCart());

// Check session
console.log('Session:', useSession());

// Check localStorage
console.log('Local Cart:', localStorage.getItem('shilajit-cart'));
```

## 🎯 Success Criteria

The authentication system is considered successful when:

✅ **Users can register** with email/password
✅ **Users can login** with credentials  
✅ **Sessions persist** across browser refreshes
✅ **Cart syncs** between guest and authenticated states
✅ **Checkout requires** authentication
✅ **Orders are associated** with user accounts
✅ **Profile page** shows user data and orders
✅ **Logout clears** session and transitions cart
✅ **Security measures** protect user data
✅ **Error handling** provides clear feedback

The system now provides a complete, secure, and user-friendly authentication experience that integrates seamlessly with the e-commerce functionality.