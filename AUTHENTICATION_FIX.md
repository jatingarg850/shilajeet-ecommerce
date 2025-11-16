# Authentication Fix Guide

## 🔧 Issue Fixed

The 403 error was occurring because of authentication/session issues. I've added debugging and a test endpoint.

---

## 🧪 Testing Steps

### Step 1: Test Authentication
1. **Open your browser and navigate to:**
   ```
   http://localhost:3000/api/admin/test-auth
   ```

2. **Expected Results:**

   **If NOT logged in:**
   ```json
   {
     "error": "No session found",
     "message": "You are not logged in"
   }
   ```

   **If logged in as admin:**
   ```json
   {
     "success": true,
     "session": {
       "userId": "...",
       "userName": "Admin User",
       "userEmail": "admin@agnishila.com",
       "userRole": "admin"
     },
     "database": {
       "userId": "...",
       "userName": "Admin User",
       "userEmail": "admin@agnishila.com",
       "userRole": "admin"
     },
     "isAdmin": true
   }
   ```

### Step 2: Login Process

1. **Clear your browser cookies/session:**
   - Chrome: DevTools → Application → Cookies → Clear all
   - Or use Incognito/Private window

2. **Navigate to login:**
   ```
   http://localhost:3000/admin/login
   ```

3. **Login with credentials:**
   ```
   Email: admin@agnishila.com
   Password: admin123
   ```

4. **After successful login:**
   - Should redirect to `/admin` (dashboard)
   - Check browser console for any errors

### Step 3: Test Analytics API

1. **After logging in, navigate to:**
   ```
   http://localhost:3000/admin/analytics
   ```

2. **Check browser console (F12):**
   - Look for any error messages
   - Check Network tab for API calls

3. **Check server console:**
   - Look for debug logs:
     ```
     Analytics API - Session: { ... }
     Analytics API - User found: { id: ..., role: 'admin' }
     ```

---

## 🔍 Debugging Information

### Check Server Console

When you access `/admin/analytics`, you should see:
```
Analytics API - Session: {
  user: {
    id: '...',
    name: 'Admin User',
    email: 'admin@agnishila.com',
    role: 'admin'
  }
}
Analytics API - User found: { id: '...', role: 'admin' }
```

### If You See 403 Error

The API will now return detailed debug info:
```json
{
  "error": "Forbidden - Admin access required",
  "debug": {
    "userFound": true/false,
    "userRole": "admin" or "customer",
    "sessionUserId": "..."
  }
}
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "No session found"
**Cause:** Not logged in or session expired
**Solution:** 
1. Go to `/admin/login`
2. Login with admin credentials
3. Try again

### Issue 2: "User not found in database"
**Cause:** User ID in session doesn't match database
**Solution:**
1. Clear browser cookies
2. Re-run seed script: `npm run seed`
3. Login again

### Issue 3: "userRole: customer"
**Cause:** Logged in as customer, not admin
**Solution:**
1. Logout
2. Login with admin credentials:
   - Email: `admin@agnishila.com`
   - Password: `admin123`

### Issue 4: Session not persisting
**Cause:** NextAuth configuration issue
**Solution:**
1. Check `.env` file has `NEXTAUTH_SECRET`
2. Restart dev server
3. Clear browser cache
4. Login again

---

## 🔐 Verify Admin User in Database

You can verify the admin user exists with correct role:

### Option 1: Using MongoDB Compass
1. Connect to your MongoDB Atlas
2. Navigate to `shilajit-store` database
3. Open `users` collection
4. Find user with email `admin@agnishila.com`
5. Verify `role` field is `"admin"`

### Option 2: Re-run Seed Script
```bash
npm run seed
```

This will:
- Clear all data
- Create fresh admin user with role "admin"
- Create sample data

---

## 📝 What I Changed

### 1. Added Debug Logging
**File:** `app/api/admin/analytics/route.ts`
- Added console.log statements
- Added detailed error responses
- Shows session and user info

### 2. Created Test Endpoint
**File:** `app/api/admin/test-auth/route.ts`
- New endpoint to test authentication
- Returns detailed session info
- Helps diagnose auth issues

### 3. Fixed Login Redirect
**File:** `app/admin/login/page.tsx`
- Changed redirect from `/admin/dashboard` to `/admin`
- Added `router.refresh()` to ensure session is loaded

---

## ✅ Expected Behavior

After fixing:

1. **Login** → Redirects to `/admin` dashboard
2. **Dashboard** → Shows real data
3. **Analytics** → Loads without 403 error
4. **All admin pages** → Work correctly

---

## 🚀 Quick Fix Steps

If still having issues:

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Clear and reseed database
npm run seed

# 3. Restart dev server
npm run dev

# 4. Clear browser cookies/cache

# 5. Login again
# Navigate to: http://localhost:3000/admin/login
# Email: admin@agnishila.com
# Password: admin123

# 6. Test auth endpoint
# Navigate to: http://localhost:3000/api/admin/test-auth

# 7. Try analytics page
# Navigate to: http://localhost:3000/admin/analytics
```

---

## 📞 Still Having Issues?

Check these:

1. **Environment Variables:**
   ```env
   MONGODB_URI=mongodb+srv://...
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

2. **Server Console:** Look for error messages

3. **Browser Console:** Check for JavaScript errors

4. **Network Tab:** Check API responses

---

## ✨ Summary

- ✅ Added authentication debugging
- ✅ Created test endpoint
- ✅ Fixed login redirect
- ✅ Added detailed error messages
- ✅ Improved logging

**Try the test endpoint first to verify your authentication is working!**
