# Render Deployment Guide

## Memory Optimization for Render

This project has been optimized to run on Render's standard plan (512MB RAM) with the following configurations:

### Build Optimizations

1. **Node Memory Limit**: Set to 2048MB during build
   - Configured in `package.json` build script
   - Also set in `render-build.sh`

2. **Next.js Optimizations**:
   - SWC minification enabled (faster, less memory)
   - Production source maps disabled
   - Webpack chunk splitting optimized
   - Package imports optimized for lucide-react and framer-motion

3. **Build Script** (`render-build.sh`):
   - Cleans previous builds
   - Uses `npm ci` for faster, more reliable installs
   - Sets NODE_OPTIONS for memory management

4. **Render Configuration** (`render.yaml`):
   - Specifies build command
   - Sets environment variables
   - Configures database connection

### Environment Variables Required

Set these in Render dashboard:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-app.onrender.com
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_URL=cloudinary://your_credentials
```

### Deployment Steps

1. **Connect Repository**:
   - Go to Render.com
   - Create new Web Service
   - Connect your GitHub repository

2. **Configure Build**:
   - Build Command: `bash render-build.sh`
   - Start Command: `npm start`
   - Node Version: 18 or higher

3. **Set Environment Variables**:
   - Add all required env vars in Render dashboard

4. **Deploy**:
   - Click Deploy
   - Monitor build logs

### Troubleshooting

**If you still get OOM errors**:

1. Increase Node memory in `render-build.sh`:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=3072"
   ```

2. Disable static page generation for heavy pages:
   - Add `export const dynamic = 'force-dynamic'` to page.tsx files

3. Use Render's higher plan if needed

### Performance Tips

- All images are served from Cloudinary CDN
- Static pages are pre-generated at build time
- Dynamic pages use on-demand rendering
- Database queries are optimized with indexes

### Monitoring

- Check Render logs for build/runtime errors
- Monitor memory usage in Render dashboard
- Set up error tracking (Sentry, etc.)

### Files Included

- `render.yaml` - Render configuration
- `render-build.sh` - Optimized build script
- `.renderignore` - Files to exclude from build
- `next.config.js` - Next.js optimizations
- `package.json` - Build script with memory settings
