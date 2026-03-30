# Step.uz Backend

O'zbekiston yoshlari uchun karyera platformasi - Backend API.

## Texnologiyalar

- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL
- Socket.io (Real-time chat)
- JWT Authentication
- Helmet + CORS + Rate Limiting (Xavfsizlik)

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

## Database sozlamalari

```bash
# Prisma client generate
npm run db:generate

# Database migration
npm run db:migrate

# Prisma Studio (GUI)
npm run db:studio
```

## Renderga Deploy qilish

1. Render.com ga kiring
2. Yangi Web Service yarating
3. GitHub repo ulang
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. PostgreSQL database qo'shing

## Environment Variables

`.env` fayl yaratib, quyidagi o'zgaruvchilarni qo'shing:

```
DATABASE_URL=postgresql://user:password@host:port/dbname?schema=public
JWT_SECRET=your-super-secret-key
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Ro'yxatdan o'tish
- `POST /api/auth/login` - Kirish
- `GET /api/auth/me` - Profil ma'lumotlari
- `POST /api/auth/refresh` - Token yangilash

### Jobs
- `GET /api/jobs` - Ishlar ro'yxati
- `GET /api/jobs/:id` - Ish detallari
- `POST /api/jobs` - Ish yaratish (Company)
- `PUT /api/jobs/:id` - Ish yangilash (Company)
- `DELETE /api/jobs/:id` - Ish o'chirish (Company)

### Applications
- `GET /api/applications/my` - Mening arizalarim
- `POST /api/applications` - Ariza yuborish (Student)
- `PATCH /api/applications/:id/status` - Status yangilash (Company)

### Chats
- `GET /api/chats` - Chatlar ro'yxati
- `GET /api/chats/:id` - Chat xabarlar
- `POST /api/chats` - Chat yaratish
- `POST /api/chats/:id/messages` - Xabar yuborish

### Notifications
- `GET /api/notifications` - Bildirishnomalar
- `PATCH /api/notifications/:id/read` - O'qilgan deb belgilash
- `PATCH /api/notifications/read-all` - Barchasini o'qilgan deb belgilash
