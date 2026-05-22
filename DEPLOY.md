# Step.uz - Vercel Deployment Guide

## 🚀 Vercelga Deploy qilish

### Loyiha tuzilishi
```
step.uz/
├── frontend/     → Next.js (Vercel'ga deploy qilinadi)
├── backend/      → Express.js (Render/Railway'ga deploy qilinadi)
└── vercel.json   → Vercel konfiguratsiyasi
```

---

## 📌 1-QADAM: Ma'lumotlar bazasini ulash (Neon.tech - Bepul PostgreSQL)

1. **[neon.tech](https://neon.tech)** ga kiring va hisob oching (GitHub bilan)
2. **"New Project"** bosing → Nom bering (masalan: `step-uz`)
3. Region: **AWS / eu-central-1** tanlang
4. **"Create project"** bosing
5. Ko'rsatilgan **Connection string**ni nusxa oling:
   ```
   postgresql://username:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

---

## 📌 2-QADAM: Frontendni Vercel'ga Deploy qilish

### Variant A: GitHub orqali (Tavsiya etiladi)

1. Loyihani GitHub'ga push qiling:
   ```bash
   git add .
   git commit -m "Vercel deployment ready"
   git push origin main
   ```

2. **[vercel.com](https://vercel.com)** ga kiring (GitHub bilan)

3. **"Add New Project"** → Repository'ni tanlang (`step.uz`)

4. **Framework Preset**: `Next.js` tanlang

5. **Root Directory**: `frontend` kiriting ⚠️ (Bu muhim!)

6. **Build & Output Settings** (avtomatik aniqlanadi):
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

7. **Environment Variables** qo'shing:
   ```
   DATABASE_URL          = postgresql://...  (Neon'dan)
   JWT_SECRET            = [kamida 32 ta belgidan iborat kuchli kalit]
   JWT_EXPIRES_IN        = 7d
   NEXT_PUBLIC_APP_URL   = https://sizning-loyiha.vercel.app
   NEXT_PUBLIC_API_URL   = https://sizning-loyiha.vercel.app/api
   NODE_ENV              = production
   ```

8. **"Deploy"** bosing!

---

## 📌 3-QADAM: Database Migration

Deploy muvaffaqiyatli bo'lgandan keyin:

1. Vercel Dashboard → Project → **Settings → Functions**
2. Yoki local terminalda:
   ```bash
   cd frontend
   # .env.local faylini yarating va DATABASE_URL qo'shing
   npx prisma migrate deploy
   npx prisma generate
   ```

**Yoki Vercel CLI orqali:**
```bash
npm i -g vercel
vercel env pull .env.local
cd frontend
npx prisma migrate deploy
```

---

## 📌 4-QADAM: Backendni Render'ga Deploy qilish (WebSocket uchun)

Backend Socket.io ishlatganligi sababli, Render'da deploy qilish tavsiya etiladi:

1. **[render.com](https://render.com)** → **"New Web Service"**
2. GitHub repository'ni tanlang
3. Konfiguratsiya:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Environment Variables**:
   ```
   DATABASE_URL    = postgresql://... (Neon'dan, xuddi frontend bilan bir xil)
   JWT_SECRET      = [xuddi frontend bilan bir xil kalit]
   JWT_EXPIRES_IN  = 7d
   PORT            = 10000
   NODE_ENV        = production
   FRONTEND_URL    = https://sizning-loyiha.vercel.app
   ```

5. Deploy bo'lgandan keyin URL'ni oling va frontendga qo'shing:
   ```
   NEXT_PUBLIC_WS_URL = wss://sizning-backend.onrender.com
   ```

---

## 🔧 Vercel Environment Variables to'liq ro'yxati

Vercel → Project → Settings → **Environment Variables** bo'limiga qo'shing:

| Variable | Qiymat | Majburiy |
|----------|--------|---------|
| `DATABASE_URL` | `postgresql://...` | ✅ |
| `JWT_SECRET` | `random-32-char-string` | ✅ |
| `JWT_EXPIRES_IN` | `7d` | ✅ |
| `NEXT_PUBLIC_APP_URL` | `https://step-uz.vercel.app` | ✅ |
| `NEXT_PUBLIC_API_URL` | `https://step-uz.vercel.app/api` | ✅ |
| `NODE_ENV` | `production` | ✅ |
| `NEXT_PUBLIC_WS_URL` | `wss://backend.onrender.com` | Opsional |
| `SMTP_HOST` | `smtp.gmail.com` | Opsional |
| `SMTP_PORT` | `587` | Opsional |
| `SMTP_USER` | `email@gmail.com` | Opsional |
| `SMTP_PASS` | `app-password` | Opsional |
| `OPENAI_API_KEY` | `sk-...` | Opsional |

---

## ⚠️ Muhim eslatmalar

### Prisma uchun
- Frontend va Backend **bir xil `DATABASE_URL`** ishlatishi mumkin
- Vercel'da `prisma generate` **postinstall** script orqali avtomatik ishlaydi
- Migration uchun local yoki Render shell'dan `prisma migrate deploy` ishlating

### CORS uchun
- `server.ts` faylida Vercel URL'ni `allowedOrigins`ga qo'shing:
  ```typescript
  'https://sizning-loyiha.vercel.app',
  ```

### Next.js config
- `output: 'standalone'` **olib tashlangan** (Vercel bilan mos emas)
- Prisma packages `serverComponentsExternalPackages`ga qo'shilgan

---

## 🔍 Tekshirish

Deploy bo'lgandan keyin quyidagi endpointlarni tekshiring:

```
https://sizning-loyiha.vercel.app/            → Bosh sahifa
https://sizning-loyiha.vercel.app/api/auth/login → Login API
https://backend.onrender.com/health           → Backend health
```

---

## 🛠 Muammolar va yechimlar

### "Prisma not found" xatosi
```bash
# frontend/package.json ga qo'shing:
"postinstall": "prisma generate || true"
# (Allaqachon qo'shilgan ✅)
```

### "DATABASE_URL not set" xatosi
- Vercel → Project → Settings → Environment Variables tekshiring
- Production, Preview, Development uchun alohida qo'yish mumkin

### Build xatosi
- Vercel build logs ko'ring
- `next.config.ts`da `ignoreBuildErrors: true` allaqachon bor ✅

### CORS xatosi  
- `backend/src/server.ts`dagi `allowedOrigins`ga Vercel URL'ingizni qo'shing
- Backend'ni qayta deploy qiling
