# Security Policy

## 🔒 Security Measures

This project implements multiple layers of security:

### Infrastructure
- ✅ **HTTPS Only** with HSTS (max-age: 2 years)
- ✅ **Cloudflare CDN** for DDoS protection
- ✅ **Vercel Edge Network** for secure hosting
- ✅ **Environment Variables** for sensitive data

### Headers
- ✅ **Content Security Policy (CSP)**
- ✅ **X-Frame-Options: SAMEORIGIN**
- ✅ **X-Content-Type-Options: nosniff**
- ✅ **X-XSS-Protection: 1; mode=block**
- ✅ **Strict-Transport-Security (HSTS)**
- ✅ **Referrer-Policy**
- ✅ **Permissions-Policy**

### Application
- ✅ **Token-based Authentication** for admin panel
- ✅ **Server-side Validation** for all inputs
- ✅ **Rate Limiting** on API routes
- ✅ **Zod Validation** for type-safe form handling
- ✅ **CORS Protection**
- ✅ **SQL Injection Prevention** (no direct DB queries)

### Data Protection
- ✅ **GDPR Compliance** with privacy policy
- ✅ **Consent Management** for data collection
- ✅ **Encrypted Transmission** (TLS 1.3)
- ✅ **No Sensitive Data in Logs**
- ✅ **Secure Service Account** (least privilege)

## 🐛 Reporting a Vulnerability

**DO NOT** open a public issue for security vulnerabilities.

Instead, please email: **neordinata@ya.ru** with:

1. **Description** of the vulnerability
2. **Steps to reproduce** the issue
3. **Potential impact** assessment
4. **Suggested fix** (if you have one)

### What to Expect

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Depends on severity
  - Critical: 24-72 hours
  - High: 1-2 weeks
  - Medium: 2-4 weeks
  - Low: Best effort

### Severity Levels

| Severity | Description | Examples |
|----------|-------------|----------|
| **Critical** | Immediate threat to user data or system | RCE, SQL Injection, Auth bypass |
| **High** | Significant security risk | XSS, CSRF, Data leakage |
| **Medium** | Moderate security concern | Rate limit bypass, Info disclosure |
| **Low** | Minor security issue | Missing headers, Weak cipher |

## 🏆 Responsible Disclosure

We appreciate responsible disclosure and will:

1. Acknowledge your report promptly
2. Keep you informed of our progress
3. Credit you in our security acknowledgments (if desired)
4. Not pursue legal action for good-faith research

### Out of Scope

Please do not test for:
- Social engineering attacks
- Physical attacks on infrastructure
- Attacks on third-party services (Vercel, Google, Cloudflare)
- Denial of Service (DoS/DDoS) attacks
- Spam or phishing attempts

## 🔐 Security Best Practices for Contributors

### Code
```typescript
// ✅ Good: Server-side validation
export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = schema.safeParse(body);
  if (!result.success) return Response.json({ error: "Invalid" }, { status: 400 });
  // ... process data
}

// ❌ Bad: No validation
export async function POST(req: NextRequest) {
  const body = await req.json();
  // ... directly use body
}
```

### Environment Variables
```typescript
// ✅ Good: Check for required vars
if (!process.env.ADMIN_TOKEN) {
  throw new Error('ADMIN_TOKEN is required');
}

// ❌ Bad: Assume vars exist
const token = process.env.ADMIN_TOKEN;
```

### Authentication
```typescript
// ✅ Good: Server-side verification
const token = req.headers.get('x-admin-token');
if (token !== process.env.ADMIN_TOKEN) {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

// ❌ Bad: Client-side only
if (localStorage.getItem('isAdmin')) {
  // ... allow access
}
```

## 📋 Security Checklist for Deployment

Before deploying to production:

- [ ] All environment variables set correctly
- [ ] HTTPS enforced (no HTTP)
- [ ] Security headers configured
- [ ] Admin token is strong (20+ characters)
- [ ] Google Service Account has minimal permissions
- [ ] No sensitive data in repository
- [ ] Dependencies are up to date
- [ ] Error messages don't leak information
- [ ] Rate limiting is active
- [ ] CORS is properly configured

## 🔄 Security Updates

### Monitoring
- Automated dependency scanning (GitHub Dependabot)
- Regular security audits
- Vercel security monitoring
- Error tracking (when implemented)

### Update Policy
- **Critical vulnerabilities:** Immediate patch
- **High vulnerabilities:** Within 7 days
- **Medium/Low vulnerabilities:** Next release cycle
- **Dependency updates:** Monthly review

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [Vercel Security](https://vercel.com/docs/security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

## 🙏 Acknowledgments

We thank the security researchers who have helped improve this project:

_(No public reports yet)_

---

**Last Updated:** January 2025  
**Contact:** neordinata@ya.ru

