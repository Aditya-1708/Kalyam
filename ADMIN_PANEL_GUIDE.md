# Admin Panel Setup & Secret Entrance Guide

## 🔐 Overview

The admin panel is a secure, cookie-based authentication system with a hidden secret entrance. Only authenticated administrators can access the panel.

---

## 🔑 Admin Credentials

**Email:** `admin@kalyam.com`  
**Password:** `Admin@123456`

> ⚠️ **WARNING:** Change these credentials immediately in production!

---

## 🎮 Secret Entrance (Easter Egg)

The admin portal has a hidden entrance on the frontend that reveals only when you unlock it with the **Konami Code**:

### How to Unlock:
Press the following arrow keys in sequence:
```
↑ ↑ ↓ ↓ ← → ← →
```
(Up, Up, Down, Down, Left, Right, Left, Right)

### What Happens:
- A **glowing lock icon** (🔒) appears in the top-right navbar
- The icon pulses and fades after 1 minute if unused
- Click it to navigate to `/admin/login`
- If you're already logged in, it redirects you to `/admin/panel`

---

## 🔓 Login Flow

1. **Unlock the secret entrance** using the Konami code
2. **Click the lock icon** in the navbar
3. **Enter email & password** on the login page
4. **Submit** - Authentication succeeds, cookie is set (httpOnly, secure, sameSite=strict)
5. **Redirected** to `/admin/panel` dashboard

---

## 🛡️ Security Features

### Client-Side:
- ✅ **Protected Routes** - Admin panel requires valid authentication
- ✅ **Cookie Verification** - Auth context checks for valid token on mount
- ✅ **Auto-Redirect** - Unauthenticated users redirected to login
- ✅ **Session Persistence** - User stays logged in across page refreshes

### Server-Side:
- ✅ **HttpOnly Cookies** - Prevents XSS attacks from stealing tokens
- ✅ **Secure Flag** - Cookies only sent over HTTPS in production
- ✅ **SameSite=Strict** - Prevents CSRF attacks
- ✅ **JWT Signing** - Tokens are cryptographically signed
- ✅ **7-Day Expiration** - Tokens automatically expire
- ✅ **Bcrypt Hashing** - Passwords never stored in plain text
- ✅ **Rate Limiting** - Brute force protection on login endpoint

---

## 📊 Admin Panel Features

### Medicines Management Tab:
- View all medicines (Human & Animal)
- Search, filter, and paginate
- Delete medicines from the database
- Real-time updates

### Admin Users Tab:
- View all admin accounts
- See user roles and creation dates
- Delete admin accounts (cannot delete your own account)
- Manage team access

---

## 🔄 API Endpoints

### Authentication:
| Method | Endpoint | Auth Required | Purpose |
|--------|----------|----------------|---------|
| POST | `/api/v1/users/login` | ❌ No | Login with email/password |
| POST | `/api/v1/users/logout` | ❌ No | Clear auth cookie |
| GET | `/api/v1/users/verify` | ✅ Yes | Check if user is authenticated |

### User Management:
| Method | Endpoint | Auth Required | Purpose |
|--------|----------|----------------|---------|
| GET | `/api/v1/users` | ✅ Yes | Get all admin users |
| POST | `/api/v1/users` | ✅ Yes | Create new admin user |
| GET | `/api/v1/users/:id` | ✅ Yes | Get specific user |
| DELETE | `/api/v1/users/:id` | ✅ Yes | Delete user |

---

## 🚀 Deployment Checklist

### Before Going Live:

1. **Change Admin Password:**
   ```bash
   # Connect to your database and update the password
   ```

2. **Update Environment Variables:**
   ```env
   NODE_ENV=production
   JWT_SECRET=your-very-long-secure-random-string
   DATABASE_URL=your-production-db-url
   ```

3. **Enable HTTPS:** 
   - Secure flag on cookies only works with HTTPS
   - Use Let's Encrypt or similar

4. **Change CORS Origin:**
   ```javascript
   // In server/src/app.js
   cors({
     origin: "https://your-domain.com", // Change from localhost:3000
     credentials: true,
   })
   ```

5. **Update Cookie Settings:**
   ```javascript
   res.cookie("token", token, {
     httpOnly: true,
     secure: true, // Must be HTTPS in production
     sameSite: "strict",
     maxAge: 7 * 24 * 60 * 60 * 1000,
     domain: ".your-domain.com" // Optional: for subdomains
   });
   ```

6. **Review Rate Limiting:**
   - Adjust `/api/v1/users` limit if needed
   - Current: 100 requests per 15 minutes

---

## 🧪 Testing the Admin Panel

### Local Testing:
1. Start server: `npm run dev` (from Server folder)
2. Start client: `npm run dev` (from Client folder)
3. In browser, press: ↑ ↑ ↓ ↓ ← → ← → (Konami code)
4. Click the lock icon in navbar
5. Login with: `admin@kalyam.com` / `Admin@123456`

### Testing Protected Routes:
- Try accessing `/admin/panel` directly without logging in
- Should redirect to `/admin/login`
- After login, should be accessible

### Testing Session Persistence:
- Login to admin panel
- Refresh the page
- Should remain logged in
- Close browser and reopen
- Should still be logged in (within 7 days)

---

## 🗑️ Logout & Session Cleanup

**Logout clears:**
- ✅ HttpOnly cookie (set to expire)
- ✅ Auth context state (user = null)
- ✅ Local React state
- ✅ Redirects to home page

---

## 🚨 Troubleshooting

### Issue: Can't see lock icon in navbar
**Solution:** 
- Make sure you pressed the Konami code correctly
- Try pressing very slowly: ↑ ↑ ↓ ↓ ← → ← →
- Check browser console for errors

### Issue: Login fails with "Invalid email or password"
**Solution:**
- Verify credentials are correct
- Check database has been seeded with `npm run seed`
- Check server is running and accessible

### Issue: Logged out after refresh
**Solution:**
- Cookie might have expired (7 days max)
- Check if secure/httpOnly cookie settings are correct
- Verify DATABASE_URL and JWT_SECRET are set

### Issue: "Not authorized, missing token" error
**Solution:**
- Browser might have cookies disabled
- Check if cookie is being sent: DevTools → Network → verify cookie headers
- Clear cookies and login again

---

## 📝 Code Structure

```
Client/
├── src/
│   ├── api/
│   │   └── authApi.js          # Auth API calls
│   ├── context/
│   │   └── AuthContext.jsx     # Global auth state
│   ├── components/
│   │   ├── Navbar.jsx          # Secret entrance hook
│   │   └── ProtectedRoute.jsx  # Route guard
│   ├── hooks/
│   │   └── useSecretEntrance.js # Konami code hook
│   ├── pages/
│   │   ├── AdminLogin.jsx      # Login form
│   │   └── AdminPanel.jsx      # Dashboard
│   └── App.jsx                 # Route setup with AuthProvider

Server/
├── src/
│   ├── routes/
│   │   └── userRouter.js       # Auth routes
│   ├── controllers/
│   │   └── userController.js   # Auth logic
│   └── middlewares/
│       └── authenticate.js     # Cookie verification
└── prisma/
    ├── schema.prisma           # User schema
    └── seed.js                 # Admin seed script
```

---

## 🎯 Next Steps

1. Create multiple admin accounts via the Admin Panel
2. Assign different roles (ADMIN/USER)
3. Implement role-based access control (RBAC)
4. Add admin activity logging
5. Set up password reset functionality
6. Implement 2FA for extra security

---

## ✅ Validation Checklist

- [x] Secret entrance (Konami code) works
- [x] Login creates secure httpOnly cookie
- [x] Protected routes redirect unauthenticated users
- [x] Admin panel displays medicines and users
- [x] Delete functionality works
- [x] Logout clears auth state
- [x] Session persists on refresh
- [x] Code is production-ready
- [x] Security best practices implemented
- [x] Database properly seeded