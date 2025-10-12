# 📸 Screenshot Guide for README

## How to Take Professional Screenshots

### Tools
- **Mac:** Cmd+Shift+4 (select area) or Cmd+Shift+3 (full screen)
- **Chrome DevTools:** F12 → Device toolbar (responsive testing)
- **CleanShot X / Skitch** — for annotations (optional)

---

## Required Screenshots

### 1. **hero.png** — Hero Section
**What to capture:**
- Full hero section with "НЕОРДИНАТА" title
- Text and "Записаться" button
- Right side with photo/placeholder
- Shows grid overlay subtly

**How:**
1. Open https://aethr.ru
2. Scroll to top
3. Capture from top of page to bottom of hero
4. Resolution: ~1920x1080 or 2560x1440

---

### 2. **teachers.png** — Teacher Profiles
**What to capture:**
- Teacher list on left
- Selected teacher detail on right
- Toggle buttons ("О себе" / "Глазами директора")
- Colorful teacher cards

**How:**
1. Scroll to "Команда" section
2. Click on a teacher
3. Capture entire section
4. Make sure both bio toggle states are visible (take 2 shots if needed)

---

### 3. **admin.png** — Admin Panel
**What to capture:**
- Admin panel interface
- Teacher editing form
- File upload fields
- Color picker
- Swiss Design styling

**How:**
1. Go to https://aethr.ru/admin
2. Login with your admin token
3. Open a teacher for editing
4. Capture the full interface
5. **⚠️ Blur/hide any sensitive tokens or data**

---

### 4. **mobile.png** — Mobile View
**What to capture:**
- Mobile hero section
- Mobile navigation (if any)
- Proper padding and responsive layout

**How:**
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M)
3. Select iPhone 14 Pro or similar
4. Capture hero + one more section
5. Use DevTools screenshot: Cmd+Shift+P → "Capture screenshot"

---

## Optional Screenshots

### 5. **events.png** — Events Carousel
- Event section with photo carousel
- Navigation dots
- Event description

### 6. **faq.png** — FAQ Section
- Accordion items
- One item open, others closed
- Swiss Design borders

### 7. **contact.png** — Contact Form
- Form fields with validation
- Submit button with loading state
- Success screen (if possible)

---

## Post-Processing

### Recommended:
1. **Resize** to max 1920px wide (for GitHub)
2. **Optimize** with ImageOptim or TinyPNG
3. **Format:** PNG or JPG (PNG preferred for UI)
4. **File size:** Keep under 500KB each

### Tools:
```bash
# Install ImageOptim (Mac)
brew install imageoptim-cli

# Optimize
imageoptim docs/screenshots/*.png
```

---

## Placement in README

After taking screenshots, they'll automatically appear in README.md:

```markdown
![Hero Section](./docs/screenshots/hero.png)
![Teachers Section](./docs/screenshots/teachers.png)
![Admin Panel](./docs/screenshots/admin.png)
![Mobile View](./docs/screenshots/mobile.png)
```

---

## Tips for MIT Admission

### What MIT Looks For:
- **Clean, professional UI/UX**
- **Real-world impact** (school actually uses it)
- **Technical depth** (admin panel, API, animations)
- **Attention to detail** (Swiss Design, Safari optimization)
- **Problem-solving** (FOUC fix, mobile responsiveness)

### README Highlights:
- Emphasize **design decisions** (why Swiss Design)
- Show **technical challenges** solved (Safari, FOUC)
- Mention **real users** (alternative school in Moscow)
- Include **performance metrics** if possible
- Link to **live site** (aethr.ru)

---

## Commit Screenshots

```bash
cd /Users/boris/Desktop/schoolweb
git add docs/screenshots/*.png
git commit -m "Add project screenshots for README"
git push origin main
```

---

Good luck with MIT! 🚀

