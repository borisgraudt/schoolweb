# 🚀 Deployment Guide

## Vercel Deployment

### Prerequisites
- Vercel account connected to GitHub
- Environment variables configured in Vercel Dashboard

### Auto-Deployment (Recommended)

Every push to `main` branch triggers:
1. ✅ **GitHub Actions CI** - Runs tests and builds
2. 🚀 **Vercel Deployment** - Automatically deploys to production

### Manual Deployment

If you need to deploy manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Environment Variables

Required variables in Vercel Dashboard (Settings → Environment Variables):

```env
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
GOOGLE_SHEET_ID=your-spreadsheet-id
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx
ADMIN_TOKEN=your-secure-password
```

## Troubleshooting

### ChunkLoadError in Browser

If you see "Loading chunk failed" error:

**Solution 1: Clear Browser Cache**
- Chrome: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

**Solution 2: Rebuild on Vercel**
1. Go to Vercel Dashboard → Deployments
2. Click "..." on latest deployment
3. Select "Redeploy"
4. Choose "Use existing Build Cache: No"

**Solution 3: Update Build Command**

In `vercel.json`:
```json
{
  "buildCommand": "rm -rf .next && npm run build"
}
```

### Deployment Fails

**Check GitHub Actions**:
```bash
# View workflow runs
Visit: https://github.com/YOUR_USERNAME/schoolweb/actions
```

**Check Vercel Logs**:
1. Vercel Dashboard → Project → Deployments
2. Click on failed deployment
3. View "Build Logs" or "Function Logs"

### Slow Initial Load

Next.js 15 uses aggressive code splitting. First load might be slower, but subsequent navigation is instant.

**Optimization**:
- Images are already optimized (WebP, AVIF)
- Code is minified
- Static pages are pre-rendered
- Edge functions are deployed globally

## Performance

### Current Metrics
- **Bundle Size**: 102 kB (shared)
- **Build Time**: ~10s
- **Routes**: 14 (11 static, 3 dynamic)

### Lighthouse Scores
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## DNS & Domain

### Current Setup
- **Domain**: aethr.ru
- **DNS**: Cloudflare
- **SSL**: Automatic (Cloudflare)

### Update Domain
1. Vercel Dashboard → Project → Settings → Domains
2. Add custom domain
3. Update DNS records in Cloudflare

## Rollback

If deployment breaks:

```bash
# Via Vercel Dashboard
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → Promote to Production

# Via CLI
vercel rollback
```

## Monitoring

### View Analytics
- Vercel Analytics: Dashboard → Analytics
- Real User Monitoring enabled

### Check Errors
- Vercel Dashboard → Project → Logs
- Filter by time range and severity

## Cache Management

### Clear Vercel Cache
```bash
vercel env rm VERCEL_FORCE_NO_BUILD_CACHE
vercel env add VERCEL_FORCE_NO_BUILD_CACHE production
```

### Invalidate CDN Cache
Cloudflare automatically purges cache on deployment.

Manual purge:
1. Cloudflare Dashboard → Caching
2. Purge Everything

## Best Practices

1. **Always test locally first**
   ```bash
   npm run build
   npm run start
   ```

2. **Check CI before merging**
   - All tests pass
   - Build succeeds
   - No linter errors

3. **Monitor after deployment**
   - Check aethr.ru loads correctly
   - Test critical user flows
   - Verify form submissions work

4. **Keep dependencies updated**
   ```bash
   npm outdated
   npm update
   ```

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: Create an issue in the repo

---

**Last Updated**: January 2025  
**Maintainer**: [@borisgraudt](https://github.com/borisgraudt)

