# Step.uz - O'zbekiston Karyera Platformasi

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://step-uz-1.onrender.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-18+-green)](https://nodejs.org)

> 🚀 **Step.uz** - O'zbekiston yoshlari uchun zamonaviy karyera platformasi. Ish topish, ishchi yollash va karyera rivojlantirish uchun barcha imkoniyatlar bir joyda!

## 🌟 Asosiy Xususiyatlar

### 👨‍🎓 Talabalar uchun:
- 🔍 **Smart Job Search** - AI yordamida mos ishlar topish
- 📄 **Rezyume Builder** - Professional rezyume yaratish
- 🎯 **Skills Analytics** - Ko'nikmalarni tahlil qilish
- 💬 **Direct Messaging** - Kompaniyalar bilan to'g'ridan-to'g'ri muloqot
- 📚 **Career Resources** - Karyera bo'yicha foydali materiallar

### 🏢 Kompaniyalar uchun:
- 📢 **Job Posting** - Ish e'lonlarini joylashtirish
- 🔍 **Candidate Search** - Nomzodlarni qidirish
- 📊 **Analytics Dashboard** - Statistika va tahlillar
- 🤖 **AI Matching** - AI yordamida nomzod tanlash
- 💼 **Applicant Tracking** - Arizalarni boshqarish

## 🛠 Texnologiyalar

### Frontend:
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **Zustand** - State management

### Backend:
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **PostgreSQL** - Database
- **Redis** - Cache
- **JWT** - Authentication

### AI & Integrations:
- **OpenAI GPT** - AI assistant
- **Stripe** - Payments
- **SendGrid** - Emails
- **AWS S3** - File storage

## 🚀 Ishga Tushirish

### Talablar:
- Node.js 18+
- PostgreSQL 15+
- Redis 7+

### O'rnatish:

```bash
# Loyihani klonlash
git clone https://github.com/otabekxoff-creator/step.uz.git
cd step.uz

# Backend o'rnatish
cd backend
npm install

# Database migratsiya
npx prisma migrate dev
npx prisma generate

# Frontend o'rnatish
cd ../frontend
npm install

# Ishga tushirish
cd ../backend
npm run dev

cd ../frontend
npm run dev
```

### Docker orqali ishga tushirish:

```bash
# Barcha servicelarni ishga tushirish
docker-compose up -d

# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

## 📁 Loyiha Tuzilishi

```
step.uz/
├── frontend/           # Next.js frontend
│   ├── src/
│   │   ├── app/       # Next.js App Router
│   │   ├── components/# React components
│   │   ├── services/  # API services
│   │   ├── hooks/     # Custom hooks
│   │   ├── utils/     # Utilities
│   │   └── types/     # TypeScript types
│   └── public/        # Static files
├── backend/           # Node.js backend
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Middleware
│   │   ├── models/       # Database models
│   │   └── utils/        # Utilities
│   └── prisma/         # Prisma schema
└── docs/              # Documentation
```

## 🔧 Konfiguratsiya

### Environment Variables:

**Backend (.env):**
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/stepuz
JWT_SECRET=your-super-secret-key
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
```

## 📊 Ma'lumotlar Bazasi

![Database Schema](docs/database-schema.png)

## 🧪 Testing

```bash
# Unit testlar
npm run test

# Integration testlar
npm run test:integration

# E2E testlar
cd frontend
npm run cypress:run
```

## 🚀 Deployment

### Render.com:
1. GitHub bilan ulash
2. Environment variables sozlash
3. Auto-deploy yoqish

### Manual Deployment:
```bash
# Production build
cd backend
npm run build
cd ../frontend
npm run build

# Start
cd ../backend
npm start
cd ../frontend
npm start
```

## 📝 API Documentation

API documentation: [API Docs](docs/api/README.md)

### Asosiy Endpointlar:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Ro'yxatdan o'tish |
| `/api/auth/login` | POST | Tizimga kirish |
| `/api/auth/me` | GET | Foydalanuvchi ma'lumotlari |
| `/api/jobs` | GET | Ishlar ro'yxati |
| `/api/jobs` | POST | Ish yaratish |
| `/api/companies` | GET | Kompaniyalar ro'yxati |
| `/api/applications` | GET | Arizalar ro'yxati |
| `/api/applications` | POST | Ariza yuborish |
| `/api/chats` | GET | Chatlar ro'yxati |
| `/api/ai/ask` | POST | AI yordamchi |

## 🤝 Hissa qo'shish

1. Fork qiling
2. Branch yarating: `git checkout -b feature/amazing-feature`
3. O'zgarishlar qiling: `git commit -m 'Add amazing feature'`
4. Push qiling: `git push origin feature/amazing-feature`
5. Pull Request oching

Qo'shimcha ma'lumot: [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 Litsenziya

Loyiha [MIT](LICENSE) litsenziyasi ostida tarqatiladi.

## 👥 Jamoa

- **Otabek** - Founder & Lead Developer
- **Jamoa** - [Contributors](https://github.com/otabekxoff-creator/step.uz/graphs/contributors)

## 📞 Aloqa

- 🌐 Website: [https://step-uz-1.onrender.com](https://step-uz-1.onrender.com)
- 📧 Email: support@step.uz
- 💬 Telegram: [@stepuz](https://t.me/stepuz)
- 📱 Instagram: [@step.uz](https://instagram.com/step.uz)

---

<p align="center">Made with ❤️ in Uzbekistan</p>
