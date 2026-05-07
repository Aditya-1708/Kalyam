# Authentication System Architecture

## 🔐 Security Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  1. User presses Konami Code (↑↑↓↓←→←→)                        │
│     └─> useSecretEntrance hook detects sequence                 │
│     └─> Lock icon appears in Navbar (animated)                  │
│                                                                   │
│  2. User clicks lock icon → Navigate to /admin/login            │
│     └─> AdminLogin page rendered                                │
│                                                                   │
│  3. User enters email & password                                │
│     └─> POST /api/v1/users/login {email, password}            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (Express + Prisma)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  4. Login endpoint receives credentials                          │
│     ├─> Hash email (case-insensitive lookup)                   │
│     ├─> Query database for user                                 │
│     ├─> Compare password with bcrypt                            │
│     └─> If valid:                                               │
│         ├─> Generate JWT token (7-day expiry)                  │
│         ├─> Set secure httpOnly cookie                          │
│         │   ├─ httpOnly: true (XSS protection)                 │
│         │   ├─ secure: true (HTTPS only)                       │
│         │   ├─ sameSite: strict (CSRF protection)              │
│         │   └─ maxAge: 7 days                                   │
│         └─> Return user object (password excluded)              │
│                                                                   │
│     └─> If invalid: Return 401 Unauthorized                    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Auth Context)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  5. Response received & stored in React state                   │
│     ├─> login() called in AuthContext                           │
│     ├─> User object stored in state                             │
│     ├─> isAuthenticated = true                                  │
│     └─> Redirect to /admin/panel                                │
│                                                                   │
│  6. On /admin/panel:                                            │
│     ├─> ProtectedRoute component checks isAuthenticated        │
│     ├─> If true: Render AdminPanel                              │
│     └─> If false: Redirect to /admin/login                      │
│                                                                   │
│  7. When fetching admin resources:                              │
│     ├─> GET /api/v1/users (medicines, users, etc)             │
│     ├─> Browser auto-includes cookie in request                │
│     ├─> (withCredentials: true in axios config)                │
│     └─> Server validates cookie/JWT                            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Security Layers

### Layer 1: Transport Security
- **HTTPS Only** - Cookies sent only over encrypted connection
- **TLS/SSL** - Protects data in transit
- **Secure Flag** - Cookie not sent over HTTP

### Layer 2: Cookie Security
- **HttpOnly Flag** - JavaScript cannot access cookie (XSS protection)
- **SameSite=Strict** - Only sent with same-site requests (CSRF protection)
- **Signed JWT** - Token cannot be tampered with
- **7-Day Expiry** - Automatic session timeout

### Layer 3: Authentication
- **Bcrypt Hashing** - Passwords hashed with salt (not reversible)
- **JWT Signing** - Token signed with secret key
- **Rate Limiting** - Max 100 requests per 15 minutes per IP
- **Email/Password Validation** - Both required, both encrypted

### Layer 4: Authorization
- **Protected Routes** - Frontend redirects unauthenticated users
- **Authenticate Middleware** - Backend verifies token on protected routes
- **Database Validation** - User still exists in database
- **Role-Based Access** - Can extend with ADMIN/USER roles

---

## 📋 Authentication Middleware Flow

```javascript
// authenticate.js
const authenticate = async (req, res, next) => {
  // 1. Extract token from cookies
  const token = req.cookies?.token;
  
  // 2. If no token, return 401
  if (!token) return res.status(401).json({message: "Not authorized"});
  
  // 3. Verify JWT signature using JWT_SECRET
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  // 4. Query database to confirm user still exists
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { id, email, name, role, createdAt, updatedAt }
  });
  
  // 5. If user exists, attach to request and continue
  if (user) {
    req.user = user;
    next();
  } else {
    // 6. If user deleted, return 401
    res.status(401).json({message: "User no longer exists"});
  }
};
```

---

## 🔄 Token Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                   TOKEN LIFECYCLE (7 Days)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Created: Login successful                                      │
│  ├─ JWT payload: { id: 1, iat: 1234567890, exp: 1234999999 }  │
│  ├─ Signed with: JWT_SECRET                                     │
│  └─ Stored in: httpOnly Cookie                                  │
│                                                                   │
│  Active: Token valid for 7 days from creation                   │
│  ├─ Sent with every authenticated request                       │
│  ├─ Verified against JWT_SECRET                                 │
│  └─ User looked up in database                                  │
│                                                                   │
│  Expired: After 7 days or user logs out                         │
│  ├─ Cookie deleted (expires set to past date)                   │
│  ├─ Token in browser is invalid                                 │
│  └─ Next request redirects to login                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎮 Secret Entrance Implementation

### Konami Code Detector:

```javascript
// useSecretEntrance.js
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                     'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

export const useSecretEntrance = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // 1. Append pressed key to sequence
      const newSequence = [...keySequence, e.key];
      
      // 2. Keep only last 8 keys
      if (newSequence.length > 8) newSequence.shift();
      
      // 3. Check if matches Konami code
      const matches = KONAMI_CODE.every((key, index) => 
        newSequence[index] === key
      );
      
      // 4. If match, unlock and auto-hide after 1 minute
      if (matches) {
        setIsUnlocked(true);
        setTimeout(() => setIsUnlocked(false), 60000);
      }
      
      setKeySequence(newSequence);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence]);

  return isUnlocked;
};
```

---

## 📡 API Request/Response Flow

### Login Request:
```http
POST /api/v1/users/login HTTP/1.1
Content-Type: application/json

{
  "email": "admin@kalyam.com",
  "password": "Admin@123456"
}
```

### Login Response (Success):
```http
HTTP/1.1 200 OK
Set-Cookie: token=eyJhbGc...8fQ; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
Content-Type: application/json

{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "admin@kalyam.com",
    "name": "Admin User",
    "role": "ADMIN",
    "createdAt": "2026-05-05T12:20:37.000Z"
  }
}
```

### Login Response (Failure):
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "message": "Invalid email or password"
}
```

### Protected Endpoint Request:
```http
GET /api/v1/users HTTP/1.1
Cookie: token=eyJhbGc...8fQ
```

### Protected Endpoint Response:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "users": [
    {
      "id": 1,
      "email": "admin@kalyam.com",
      "name": "Admin User",
      "role": "ADMIN"
    }
  ]
}
```

---

## 🔄 Session Management

### On App Mount (AuthContext):
```javascript
useEffect(() => {
  checkAuth();  // Verify token and load user
}, []);

const checkAuth = async () => {
  try {
    // GET /api/v1/users/verify (includes cookie)
    const response = await verifyAuth();
    setUser(response.data.user);
    setIsAuthenticated(true);
  } catch (error) {
    setUser(null);
    setIsAuthenticated(false);
  } finally {
    setLoading(false);
  }
};
```

### On Page Refresh:
1. Browser maintains httpOnly cookie
2. `checkAuth()` is called automatically
3. If cookie is valid, user is restored
4. If cookie is expired/invalid, user is logged out
5. No need to login again (session persists)

### On Logout:
```javascript
const logout = async () => {
  await logoutAdmin();  // POST /api/v1/users/logout
  // Server clears cookie
  // Frontend clears state
  setUser(null);
  setIsAuthenticated(false);
  navigate('/');
};
```

---

## 🚀 Secure Deployment Checklist

- [ ] NODE_ENV=production
- [ ] JWT_SECRET is long random string (>32 chars)
- [ ] Database URL points to production
- [ ] HTTPS/SSL certificate installed
- [ ] CORS origin updated to production domain
- [ ] Rate limiting configured
- [ ] Admin password changed from default
- [ ] Password reset flow implemented
- [ ] Error messages don't leak sensitive info
- [ ] Logs don't contain passwords/tokens
- [ ] Database backups configured
- [ ] Monitoring/alerting set up
- [ ] API keys rotated if needed
- [ ] Dependency vulnerabilities scanned
- [ ] Security headers configured (helmet.js)

---

## 🧪 Testing Scenarios

### Test Case 1: Normal Login Flow
```javascript
1. Clear all cookies
2. Navigate to /admin/login
3. Enter valid credentials
4. Verify redirect to /admin/panel
5. Verify lock icon disappears (session established)
```

### Test Case 2: Session Persistence
```javascript
1. Login to admin panel
2. Refresh page (Ctrl+R)
3. Verify still logged in (no redirect to login)
4. Verify user data is loaded
```

### Test Case 3: Protected Route
```javascript
1. Clear all cookies
2. Try accessing /admin/panel directly
3. Verify redirect to /admin/login
4. Verify error message displayed
```

### Test Case 4: Logout
```javascript
1. Login to admin panel
2. Click logout button
3. Verify redirect to home page
4. Verify cookie is cleared
5. Try accessing /admin/panel
6. Verify redirect to /admin/login
```

### Test Case 5: Expired Session
```javascript
1. Login to admin panel
2. Wait 7 days (or mock time)
3. Try accessing protected endpoint
4. Verify 401 response
5. Verify redirect to /admin/login
```

### Test Case 6: Invalid Token
```javascript
1. Manually clear auth cookie
2. Try accessing /admin/panel
3. Verify redirect to /admin/login
4. Verify proper error handling
```

---

## 📊 Database Schema

```sql
Table: User
┌──────────────────────────────────────┐
│ id        │ Int (Primary Key)         │
│ email     │ String (Unique)           │
│ password  │ String (Bcrypt Hashed)    │
│ name      │ String (Optional)         │
│ role      │ Role (ADMIN | USER)       │
│ createdAt │ DateTime (Auto)           │
│ updatedAt │ DateTime (Auto)           │
└──────────────────────────────────────┘

Table: Medicine
┌──────────────────────────────────────┐
│ id        │ Int (Primary Key)         │
│ brand     │ String                    │
│ sku       │ String (Unique)           │
│ strength  │ String                    │
│ target    │ TargetType (HUMAN|ANIMAL) │
│ createdAt │ DateTime (Auto)           │
│ updatedAt │ DateTime (Auto)           │
└──────────────────────────────────────┘
```

---

## ✅ Security Best Practices Implemented

| Practice | Status | Details |
|----------|--------|---------|
| Password Hashing | ✅ | Bcryptjs with salt rounds |
| HTTPS Only | ✅ | Secure flag on cookies |
| HttpOnly Cookies | ✅ | JavaScript cannot access token |
| CSRF Protection | ✅ | SameSite=Strict |
| XSS Protection | ✅ | HttpOnly + Content Security Policy |
| Rate Limiting | ✅ | 100 req/15min per IP |
| JWT Signing | ✅ | Cryptographic verification |
| Input Validation | ✅ | Email/password required |
| SQL Injection Prevention | ✅ | Prisma ORM parameterized queries |
| Secrets Management | ✅ | Environment variables (.env) |
| Session Timeout | ✅ | 7-day automatic expiry |
| Audit Trail | 🚧 | Can be implemented |
| 2FA/MFA | 🚧 | Can be implemented |
| Password Reset | 🚧 | Can be implemented |

