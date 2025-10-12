# Неордината — Alternative School Website

> A modern, Swiss Design-inspired web platform for an alternative education center in Moscow. Built with Next.js 14, TypeScript, and Framer Motion.

[![Live Site](https://img.shields.io/badge/Live-aethr.ru-black?style=flat-square)](https://aethr.ru)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

---

## 🎯 Project Overview

**Неордината** is a full-stack web application for an alternative school that emphasizes conscious learning, dialogue, and individual expression. The project showcases modern web development practices with a focus on design, performance, and user experience.

### Key Features

- **Dynamic Content Management** — Admin panel with Vercel Blob storage for real-time updates
- **Swiss Design Aesthetic** — Minimalist, functional design with bold typography and precise grid systems
- **Smooth Animations** — Safari-optimized transitions using Framer Motion and CSS transforms
- **Responsive Design** — Mobile-first approach with flawless adaptation across all devices
- **Form Integration** — Google Sheets API for student applications with validation
- **SEO Optimized** — OpenGraph meta tags, semantic HTML, and performance best practices

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14** (App Router) — React framework with server-side rendering
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling with custom Swiss Design tokens
- **Framer Motion** — Declarative animations with hardware acceleration
- **React Hook Form + Zod** — Form validation and type safety

### Backend & Infrastructure
- **Vercel Blob** — Global content storage for admin-managed data
- **Google Sheets API** — Application form submissions
- **Vercel Edge Functions** — Serverless API routes

### Developer Experience
- **ESLint + Prettier** — Code quality and formatting
- **Git** — Version control with conventional commits
- **Vitest** — Unit testing framework

---

## 📸 Screenshots

### Hero Section
*Swiss Design typography with clean grid overlay*

![Hero Section](./docs/screenshots/hero.png)

### Interactive Teacher Profiles
*Dynamic content loaded from admin panel with smooth transitions*

![Teachers Section](./docs/screenshots/teachers.png)

### Admin Panel
*Content management with Vercel Blob integration*

![Admin Panel](./docs/screenshots/admin.png)

### Mobile Experience
*Fully responsive with optimized touch interactions*

![Mobile View](./docs/screenshots/mobile.png)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Google Cloud project with Sheets API enabled
- Vercel account with Blob storage

### Installation

```bash
# Clone the repository
git clone https://github.com/borisgraudt/schoolweb.git
cd schoolweb

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

See [`ENV_SETUP.md`](./ENV_SETUP.md) for detailed setup instructions.

Required variables:
- `GOOGLE_CLIENT_EMAIL` — Service account email
- `GOOGLE_PRIVATE_KEY` — Service account private key
- `GOOGLE_SHEET_ID` — Target Google Sheet ID
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob access token
- `ADMIN_TOKEN` — Admin panel password

---

## 📚 Project Structure

```
schoolweb/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel for content management
│   │   ├── api/
│   │   │   ├── content/    # Blob storage API
│   │   │   ├── contact/    # Form submission handler
│   │   │   └── admin/      # Token verification
│   │   ├── contact/        # Application form page
│   │   ├── globals.css     # Global styles with Swiss Design tokens
│   │   ├── layout.tsx      # Root layout with metadata
│   │   └── page.tsx        # Homepage with all sections
│   ├── components/
│   │   └── FAQItem.tsx     # Accordion component
│   └── lib/
│       ├── contactSchema.ts # Zod validation schemas
│       └── teachers.ts      # Default teacher data
├── public/
│   └── images/             # Static assets
├── ENV_SETUP.md            # Detailed setup guide
└── README.md               # This file
```

---

## 🎨 Design Decisions

### Swiss Design Principles
- **Grid-based layout** — 12-column system with precise alignment
- **Helvetica typography** — Clean, readable, timeless
- **Bold color accents** — Black/white base with bright highlights
- **Functional minimalism** — Every element serves a purpose
- **Thick borders** — 2-4px borders for visual hierarchy

### Performance Optimizations
- **Hardware-accelerated animations** — `transform: translateZ(0)` for GPU rendering
- **Safari-specific fixes** — Webkit prefixes and backface visibility
- **Loading states** — Prevents flash of unstyled content (FOUC)
- **API caching** — `cache: 'no-store'` for fresh data
- **Image optimization** — Base64 encoding for small images, Next.js Image for large

### Accessibility
- Semantic HTML5 elements
- ARIA labels for interactive components
- Keyboard navigation support
- Smooth scroll behavior with reduced motion support

---

## 🔐 Admin Panel

Accessible at `/admin` with token-based authentication.

### Features
- Add/edit/delete teacher profiles
- Upload teacher photos (base64)
- Manage event content and photos
- Color picker for teacher cards
- Real-time preview

### Security
- Server-side token verification (`/api/admin/verify`)
- Environment variable-based authentication
- No localStorage persistence of sensitive data

---

## 🌐 Deployment

Deployed on [Vercel](https://vercel.com) with automatic CI/CD from the `main` branch.

### Custom Domain Setup
1. Add `aethr.ru` in Vercel project settings
2. Update nameservers at registrar to Vercel's DNS
3. Wait for DNS propagation (5-30 minutes)

### Production Checklist
- [ ] Environment variables configured
- [ ] Google Sheets API credentials added
- [ ] Vercel Blob storage connected
- [ ] Admin token set securely
- [ ] Custom domain configured
- [ ] SSL certificate issued

---

## 📈 Future Enhancements

- [ ] Blog/news section with markdown support
- [ ] Student portal with login
- [ ] Photo gallery with lightbox
- [ ] Multi-language support (EN/RU)
- [ ] Analytics integration (privacy-focused)
- [ ] Progressive Web App (PWA) support

---

## 🤝 Contributing

This is a personal project for **Неордината** alternative school. If you'd like to suggest improvements, feel free to open an issue.

---

## 📄 License

© 2025 Неордината. All rights reserved.

**Developer:** [aethr](https://github.com/borisgraudt)  
**Live Site:** [aethr.ru](https://aethr.ru)

---

## 🙏 Acknowledgments

- **Swiss Design Movement** — Design inspiration
- **Vercel** — Hosting and infrastructure
- **Next.js Team** — Framework and documentation
- **Framer Motion** — Animation library

---

*Built with ❤️ for conscious education*
