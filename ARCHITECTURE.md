# Architecture Document

## 📐 System Overview

This document describes the architecture, design decisions, and technical implementation of the School Neordinata web platform.

## 🎯 Goals & Requirements

### Functional Requirements
1. **Public Website** — Showcase school information, teachers, and events
2. **Application Form** — Allow parents to submit applications
3. **Admin Panel** — Dynamic content management for staff
4. **Mobile-First** — Optimized for mobile users (95%+ of traffic)

### Non-Functional Requirements
1. **Performance** — <2s page load, Lighthouse 90+
2. **Security** — HTTPS, CSP, token auth, GDPR compliance
3. **Scalability** — Handle 200+ concurrent users
4. **Maintainability** — Clean code, TypeScript, documentation
5. **Cost** — Minimize hosting costs (target: <$50/month)

## 🏗️ High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                           Client                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Browser (Chrome, Safari, Firefox)                     │  │
│  │  • React Components (Next.js 14)                       │  │
│  │  • Client-side State (React Hooks)                     │  │
│  │  • Form Validation (Zod + React Hook Form)            │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                              ↕ HTTPS
┌──────────────────────────────────────────────────────────────┐
│                      Cloudflare CDN                           │
│  • DDoS Protection                                            │
│  • DNS Management                                             │
│  • Edge Caching                                               │
│  • SSL/TLS Termination                                        │
└──────────────────────────────────────────────────────────────┘
                              ↕ HTTPS
┌──────────────────────────────────────────────────────────────┐
│                      Vercel Platform                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Next.js Application (Edge Runtime)                    │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  Pages (Server Components)                       │  │  │
│  │  │  • / (Homepage)                                  │  │  │
│  │  │  • /contact (Application Form)                   │  │  │
│  │  │  • /admin (Content Management)                   │  │  │
│  │  │  • /privacy (Privacy Policy)                     │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  API Routes (Serverless Functions)              │  │  │
│  │  │  • /api/content (Blob CRUD)                     │  │  │
│  │  │  • /api/contact (Form Submission)               │  │  │
│  │  │  • /api/admin/verify (Token Auth)               │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
           ↕                    ↕                    ↕
    ┌──────────┐        ┌──────────┐        ┌──────────┐
    │  Vercel  │        │  Google  │        │  Admin   │
    │   Blob   │        │  Sheets  │        │  Token   │
    │ Storage  │        │   API    │        │  (Env)   │
    └──────────┘        └──────────┘        └──────────┘
```

## 🧱 Component Architecture

### Frontend Layer

```
src/app/
├── page.tsx              # Homepage (SSR)
│   ├── Hero Section
│   ├── Events Section
│   ├── Quote Section
│   ├── Teachers Section
│   └── Contacts Section
│
├── contact/page.tsx      # Application Form (Client)
│   ├── Form Validation (Zod)
│   ├── Google Sheets Integration
│   └── Success/Error States
│
├── admin/page.tsx        # Admin Panel (Client)
│   ├── Token Authentication
│   ├── Teacher CRUD
│   ├── Event CRUD
│   └── Image Upload (Base64)
│
└── privacy/page.tsx      # Privacy Policy (Static)
```

### API Layer

```
src/app/api/
├── content/route.ts      # Blob Storage CRUD
│   ├── GET  → Fetch content
│   ├── POST → Update content (auth required)
│   └── Error handling
│
├── contact/route.ts      # Form Submission
│   ├── Zod validation
│   ├── Google Sheets append
│   └── Error handling
│
└── admin/
    └── verify/route.ts   # Token Verification
        ├── Server-side check
        └── 401 on invalid token
```

## 🔐 Security Architecture

### Defense in Depth

```
Layer 1: Network (Cloudflare)
├── DDoS Protection
├── Rate Limiting
├── Bot Detection
└── Geo-blocking (if needed)

Layer 2: Transport (TLS/HTTPS)
├── TLS 1.3
├── HSTS (max-age: 2 years)
└── Certificate pinning

Layer 3: Application (Next.js)
├── CSP Headers
├── XSS Protection
├── CSRF Protection
└── Input Validation

Layer 4: Authentication (Token-based)
├── Server-side verification
├── Environment variables
└── No client-side storage

Layer 5: Data (Encryption)
├── HTTPS in transit
├── No sensitive data in logs
└── Minimal data collection
```

### Threat Model

| Threat | Mitigation | Status |
|--------|------------|--------|
| XSS | CSP headers, React auto-escaping | ✅ |
| CSRF | SameSite cookies, Token auth | ✅ |
| SQL Injection | No direct DB, Zod validation | ✅ |
| DDoS | Cloudflare protection | ✅ |
| Brute Force | Rate limiting, Strong tokens | ✅ |
| Data Breach | Minimal data, HTTPS, Token auth | ✅ |
| Man-in-the-Middle | HSTS, TLS 1.3 | ✅ |

## 📊 Data Flow

### Public Page View
```
1. User → Cloudflare CDN
2. CDN → Cache check
3. If miss → Vercel Edge
4. Next.js SSR → Render page
5. Fetch /api/content → Vercel Blob
6. Return JSON → Render components
7. Send HTML → Cloudflare → User
```

### Form Submission
```
1. User fills form → Client validation (Zod)
2. POST /api/contact → Vercel Function
3. Server validation (Zod)
4. Google Sheets API → Append row
5. Return success → Show confirmation
6. Email notification (future)
```

### Admin Content Update
```
1. Admin login → Verify token (/api/admin/verify)
2. Fetch content → GET /api/content
3. Edit data → Client state
4. Save → POST /api/content (with token header)
5. Server: Verify token
6. Delete old blob → Put new blob
7. Return success → Update UI
```

## 🗄️ Data Storage

### Vercel Blob (Content)
**Purpose:** Store teachers and events data

**Schema:**
```typescript
{
  teachers: Array<{
    name: string;
    subject: string;
    selfBio: string;
    directorBio: string;
    color: string;      // hex
    image: string;      // base64 or URL
  }>;
  
  eventData: {
    title: string;
    description: string;
    photos: string[];   // URLs or base64
  };
}
```

**Rationale:**
- Simple data structure (no relations)
- Infrequent updates (~weekly)
- Global CDN distribution
- No maintenance overhead
- Cost-effective (<$1/month)

### Google Sheets (Form Submissions)
**Purpose:** Store application form data

**Schema:**
| Column | Type | Description |
|--------|------|-------------|
| applicantName | string | Student name |
| class | number | Grade (5-11) |
| parentName | string | Parent name |
| email | string | Contact email |
| phone | string | Phone (+7...) |
| timestamp | datetime | Submission time |
| status | string | "на рассмотрении" |

**Rationale:**
- Client requirement (familiar interface)
- Real-time collaboration
- No additional database cost
- Easy data export
- Service account for security

## ⚡ Performance Optimizations

### Rendering Strategy
- **Homepage:** SSR for SEO, then hydrate
- **Admin Panel:** Client-only (auth required)
- **Privacy Page:** Static generation

### Caching
```
Cloudflare CDN:
├── Static assets: 1 year
├── HTML: 1 hour (stale-while-revalidate)
└── API: No cache

Vercel Edge:
├── Static pages: ISR (24h)
└── API routes: No cache (dynamic)

Browser:
├── Images: 1 year
├── JS/CSS: 1 year (hash in filename)
└── HTML: No cache
```

### Bundle Optimization
- Tree shaking (automatic)
- Code splitting by route
- Dynamic imports for admin panel
- Remove console.log in production
- SWC minification

### Animation Performance
- Hardware acceleration (`transform: translateZ(0)`)
- Framer Motion (60fps)
- `will-change` for animated elements
- Safari-specific optimizations

## 📈 Scalability

### Current Capacity
- **Concurrent users:** 1,000+
- **Monthly page views:** 10,000+
- **Form submissions:** 100+/month
- **Admin updates:** 10+/month

### Bottlenecks & Mitigations
| Bottleneck | Current | Mitigation |
|------------|---------|------------|
| Vercel Functions | 100k/month free | Adequate for traffic |
| Blob Storage | 10 GB free | Using <1 MB |
| Google Sheets API | 300 requests/min | <1 request/submission |
| Cloudflare Bandwidth | Unlimited (free tier) | ✅ |

### Future Scaling Plan
If traffic exceeds limits:
1. Enable Vercel ISR (reduce function calls)
2. Add Redis cache for API responses
3. Upgrade to Vercel Pro ($20/month)
4. Consider database migration (PostgreSQL)

## 🧪 Testing Strategy

### Manual Testing (Current)
- ✅ Desktop browsers (Chrome, Firefox, Safari)
- ✅ Mobile browsers (iOS Safari, Android Chrome)
- ✅ Form validation
- ✅ Admin panel CRUD
- ✅ Error handling
- ✅ Accessibility (keyboard navigation)

### Automated Testing (Future)
```
Unit Tests (Vitest)
├── API route handlers
├── Validation schemas
├── Utility functions
└── Target: 80% coverage

Integration Tests (Playwright)
├── Form submission flow
├── Admin panel workflow
├── Navigation
└── Target: Critical paths

E2E Tests (Playwright)
├── User journey
├── Application flow
└── Target: Happy paths
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```
On Push to Main:
├── 1. Checkout code
├── 2. Install dependencies (npm ci)
├── 3. Run linter (ESLint)
├── 4. Type check (TypeScript)
├── 5. Build (next build)
├── 6. Run tests (if available)
└── 7. Deploy to Vercel (auto)

On Pull Request:
├── 1-6 (same as above)
└── 7. Deploy preview (Vercel)
```

### Deployment Strategy
- **Staging:** Automatic preview deploys (Vercel)
- **Production:** Manual approval after preview check
- **Rollback:** Instant (Vercel rollback feature)

## 📝 Decision Log

### Why Next.js over alternatives?
**Considered:** Astro, Remix, Gatsby, plain React

**Decision:** Next.js 14 with App Router

**Reasons:**
1. Server Components for performance
2. Built-in API routes (no separate backend)
3. ISR for dynamic content
4. Strong TypeScript support
5. Vercel integration (free tier)
6. Active ecosystem

### Why Vercel Blob over database?
**Considered:** PostgreSQL, MongoDB, Firebase

**Decision:** Vercel Blob

**Reasons:**
1. Simple data structure (no relations)
2. Infrequent updates (~weekly)
3. No maintenance overhead
4. Global CDN distribution
5. Cost-effective (<$1/month vs $10+/month)
6. Zero cold starts

### Why Google Sheets for forms?
**Considered:** Airtable, Notion, Database

**Decision:** Google Sheets API

**Reasons:**
1. Client requirement (school staff familiar with Sheets)
2. Real-time collaboration
3. Easy data export
4. No additional cost
5. Service account for security
6. Simple integration

## 📚 References

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Best Practices](https://vercel.com/docs/concepts/edge-network/overview)
- [React Performance](https://react.dev/learn/render-and-commit)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web.dev Performance](https://web.dev/performance/)

---

**Last Updated:** January 2025  
**Author:** [@borisgraudt](https://github.com/borisgraudt)

