# Step.uz Frontend

O'zbekiston yoshlari uchun karyera platformasi - Frontend qismi.

## Texnologiyalar

- Next.js 15
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Zustand (State Management)
- Framer Motion (Animations)

## O'rnatish

```bash
npm install
```

## Ishga tushirish

**Development:**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm start
```

## Renderga Deploy qilish

1. Render.com ga kiring
2. Yangi Web Service yarating
3. GitHub repo ulang
4. Build command: `npm install && npm run build`
5. Start command: `npm start`

## Environment Variables

`.env.local` fayl yaratib, quyidagi o'zgaruvchilarni qo'shing:

```
NEXT_PUBLIC_API_URL=https://your-backend-url/api
NEXT_PUBLIC_WS_URL=wss://your-backend-url
```
