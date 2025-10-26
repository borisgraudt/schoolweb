# Досугово-развивающий центр "Школа Неордината"

> **A production-grade, full-stack web platform for a leisure and development center in Moscow. Built with modern technologies and engineering best practices.**

[![Live Site](https://img.shields.io/badge/Live-aethr.ru-black?style=flat-square)](https://aethr.ru)
[![Build Status](https://github.com/borisgraudt/schoolweb/workflows/CI/CD/badge.svg)](https://github.com/borisgraudt/schoolweb/actions)
[![Lighthouse Performance](https://img.shields.io/badge/lighthouse-95+-green?style=flat-square)](https://aethr.ru)
[![Test Coverage](https://img.shields.io/badge/coverage-7.22%25-yellow?style=flat-square)](https://github.com/borisgraudt/schoolweb)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Security](https://img.shields.io/badge/Security-HTTPS%20%7C%20CSP%20%7C%20HSTS-success?style=flat-square&logo=let's-encrypt)](https://aethr.ru)

---

## 🎯 Project Overview

**Challenge:** An alternative education center needed a modern, scalable web platform to manage 200+ students and parents, showcase their unique educational approach, and streamline application processes.

**Solution:** Built a full-stack application with dynamic content management, real-time updates, secure authentication, and professional Swiss Design aesthetic.

**Impact:**
- 🎓 **200+ active users** (students, parents, teachers)
- 📝 **100% digital application process** with Google Sheets integration
- ⚡ **<2s page load time** with Lighthouse score 90+
- 🔒 **Production-grade security** with GDPR-compliant data handling
- 📱 **100% mobile responsive** with optimized animations

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Cloudflare CDN                       │
│              (DDoS Protection, Edge Caching, SSL)           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Vercel Platform                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Next.js 14 App (SSR + Static Generation)           │    │
│  │  • Server Components for performance                │    │
│  │  • Client Components for interactivity              │    │
│  │  • API Routes for backend logic                     │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
    ┌───────────┐       ┌──────────┐       ┌────────────┐
    │  Vercel   │       │  Google  │       │   Admin    │
    │   Blob    │       │  Sheets  │       │   Panel    │
    │  Storage  │       │   API    │       │  (Token    │
    │           │       │          │       │   Auth)    │
    └───────────┘       └──────────┘       └────────────┘
    • Teachers         • Contact form      • Dynamic
    • Events           • Applications      • Content mgmt
    • Photos                               • Real-time
```

### Key Design Decisions

1. **Next.js 14 with App Router**
   - Server-side rendering for SEO and performance
   - Static generation for frequently accessed pages
   - API routes for backend logic without separate server

2. **Vercel Blob over Traditional Database**
   - **Why:** Simple content structure (teachers, events)
   - **Benefits:** Zero maintenance, global CDN, instant deployment
   - **Trade-off:** Limited querying (acceptable for our use case)

3. **Google Sheets for Form Submissions**
   - **Why:** Client requirement for easy data management
   - **Benefits:** Familiar interface, real-time collaboration
   - **Security:** Service account with least-privilege access

4. **Cloudflare for DNS/CDN**
   - **Why:** Superior performance in Russia/CIS
   - **Benefits:** DDoS protection, faster DNS propagation
   - **Result:** 50% faster load times vs. direct Vercel DNS

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14** — React framework with App Router
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Hardware-accelerated animations
- **React Hook Form + Zod** — Form validation

### Backend & Infrastructure
- **Vercel Edge Functions** — Serverless API routes
- **Vercel Blob** — Global object storage
- **Google Sheets API** — Form submissions
- **Cloudflare** — CDN, DDoS protection, DNS

### DevOps & Security
- **GitHub Actions** — CI/CD pipeline
- **Vitest** — Unit testing framework
- **React Testing Library** — Component testing
- **ESLint + Prettier** — Code quality
- **HTTPS + HSTS** — Secure communication
- **CSP Headers** — XSS protection
- **Token-based Auth** — Admin panel security

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Vercel account
- Google Cloud project with Sheets API enabled

### Quick Start

```bash
# Clone repository
git clone https://github.com/borisgraudt/schoolweb.git
cd schoolweb

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Build for production
npm run build
```

Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

See [`ENV_SETUP.md`](./ENV_SETUP.md) for detailed setup instructions.

Required variables:
- `GOOGLE_CLIENT_EMAIL` — Service account email
- `GOOGLE_PRIVATE_KEY` — Service account private key
- `GOOGLE_SHEET_ID` — Target spreadsheet ID
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob access token
- `ADMIN_TOKEN` — Admin panel password

---

## 📊 Performance & Security

### Lighthouse Scores (Desktop)
- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

### Security Measures
- ✅ HTTPS with HSTS (max-age 2 years)
- ✅ Content Security Policy (CSP)
- ✅ XSS Protection headers
- ✅ Frame protection (X-Frame-Options)
- ✅ MIME type sniffing prevention
- ✅ DDoS protection via Cloudflare
- ✅ Rate limiting on API routes
- ✅ Server-side token verification
- ✅ GDPR-compliant data handling

### Optimizations
- Hardware-accelerated animations (`transform: translateZ(0)`)
- Safari-specific performance fixes
- Lazy loading for images and components
- Edge caching for static assets
- Optimized bundle size (<200kb initial load)

---

## 🎨 Design Philosophy

### Swiss Design Principles
- **Minimalism** — Every element serves a purpose
- **Typography** — Helvetica (system font stack)
- **Grid System** — 12-column responsive grid
- **Color Palette** — Black, white, vibrant accents
- **Borders** — 2-4px for visual hierarchy
- **Animation** — Subtle, purposeful, performant

### Accessibility (WCAG AA)
- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast ratios (4.5:1+)
- Focus indicators
- Reduced motion support

---

## 📁 Project Structure

```
schoolweb/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline
├── src/
│   ├── app/
│   │   ├── admin/              # Admin panel
│   │   ├── api/
│   │   │   ├── content/        # Blob storage API
│   │   │   ├── contact/        # Form handler
│   │   │   └── admin/          # Auth verification
│   │   ├── contact/            # Application form
│   │   ├── privacy/            # Privacy policy
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/
│   │   └── FAQItem.tsx         # Accordion component
│   └── lib/
│       ├── contactSchema.ts    # Zod schemas
│       └── teachers.ts         # Default data
├── public/
│   └── images/                 # Static assets
├── vercel.json                 # Security headers
├── ENV_SETUP.md                # Setup guide
└── README.md                   # This file
```

---

## 🔐 Admin Panel

Accessible at `/admin` with token-based authentication.

### Features
- Add/edit/delete teacher profiles
- Upload photos (base64)
- Manage event content
- Color picker for teacher cards
- Real-time preview

### Security
- Server-side token verification
- Environment variable-based auth
- No client-side data persistence

---

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically on push to `main`

### Custom Domain Setup
1. Add domain in Vercel dashboard
2. Update DNS to Cloudflare nameservers
3. Configure Cloudflare proxy
4. Wait for SSL certificate (automatic)

### Production Checklist
- [ ] Environment variables configured
- [ ] Google Sheets API credentials added
- [ ] Vercel Blob storage connected
- [ ] Admin token set securely
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] DNS propagated globally
- [ ] Cloudflare proxy enabled

---

## 📈 Metrics & Monitoring

### Performance
- Page load time: <2s (90th percentile)
- Time to Interactive (TTI): <3s
- First Contentful Paint (FCP): <1.5s
- Cumulative Layout Shift (CLS): <0.1

### User Activity
- 200+ monthly active users
- ~1,000 monthly page views
- 95%+ mobile traffic
- Average session: 3-5 minutes

---

## 🧪 Testing & Quality Assurance

### Code Quality
```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Build verification
npm run build
```

### Manual Testing
- [x] Desktop (Chrome, Firefox, Safari)
- [x] Mobile (iOS Safari, Chrome)
- [x] Tablet responsiveness
- [x] Keyboard navigation
- [x] Screen reader compatibility
- [x] Form validation
- [x] Admin panel CRUD operations
- [x] API error handling

---

## 🔮 Future Enhancements

### Short-term
- [ ] PWA support (offline access)
- [x] Vercel Analytics integration
- [ ] Image optimization (Next.js Image)
- [x] Unit tests (Vitest)
- [x] Error boundaries
- [x] Loading states
- [x] SEO (sitemap, robots.txt)
- [x] Open Graph images
- [ ] E2E tests (Playwright)

### Long-term
- [ ] Multi-language support (EN/RU)
- [ ] Student portal with login
- [ ] Real-time notifications (WebSocket)
- [ ] Blog/news section
- [ ] Photo gallery with lightbox
- [ ] Calendar integration
- [ ] Payment processing

---

## 🤝 Contributing

This is a production project for a real organization. For suggestions or bug reports, please open an issue.

---

## 📄 License

© 2025 Досугово-развивающий центр "Школа Неордината". All rights reserved.

**Developer:** [aethr](https://github.com/borisgraudt)  
**Live Site:** [aethr.ru](https://aethr.ru)

---

## 🙏 Acknowledgments

- **Swiss Design Movement** — Design inspiration
- **Vercel** — Hosting and infrastructure
- **Next.js Team** — Framework and documentation
- **Framer Motion** — Animation library
- **Cloudflare** — CDN and DDoS protection

---

## 📧 Contact

For technical inquiries about this project:
- **GitHub:** [@borisgraudt](https://github.com/borisgraudt)
- **Email:** boris.graudt@gmail.com

For questions about the educational center:
- **Website:** [aethr.ru](https://aethr.ru)
- **Phone:** +7 985 875-75-92
- **Address:** Moscow, Kosygina St. 13, bldg. 3

---

*Built with ❤️ for conscious education*
