# 🚀 Step.uz - O'zbekiston Yoshlari uchun Karyera Platformasi

<div align="center">

![Step.uz Logotipi](https://img.shields.io/badge/Step.uz-Karyera%20Platformasi-blue?style=for-the-badge&logo=next.js)
![Versiya](https://img.shields.io/badge/versiya-1.0.0-green?style=for-the-badge)
![Litsenziya](https://img.shields.io/badge/litsenziya-MIT-purple?style=for-the-badge)
![Node.js](https://img.shields.io/badge/node.js-18%2B-brightgreen?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/typescript-5%2B-blue?style=for-the-badge&logo=typescript)

**O'zbekistonning iqtidorli yoshlarini imkoniyatlar bilan bog'laydigan platforma**

[🌐 Sayt](https://step.uz) • [📖 Hujjatlar](#hujjatlar) • [🐛 Xatolik haqida xabar berish](issues) • [💡 Yangi funktsiya so'rash](issues)

</div>

## 📋 Mundarija

- [🌟 Loyiha haqida](#-loyiha-haqida)
- [✨ Imkoniyatlar](#-imkoniyatlar)
- [🏗️ Arxitektura](#️-arxitektura)
- [🛠️ Texnologik to'plam](#️-texnologik-to'plam)
- [🚀 Tezkor boshlash](#-tezkor-boshlash)
- [⚙️ Konfiguratsiya](#️-konfiguratsiya)
- [📁 Loyiha tuzilishi](#-loyiha-tuzilishi)
- [🔧 Ishlab chiqarish](#-ishlab-chiqarish)
- [🐳 Docker orqali deployment](#-docker-orqali-deployment)
- [📚 API hujjatlari](#-api-hujjatlari)
- [🧪 Testlash](#-testlash)
- [🤝 Hissa qo'shish](#-hissa-qoshish)
- [📄 Litsenziya](#-litsenziya)

## 🌟 Loyiha haqida

**Step.uz** - bu O'zbekiston yoshlari uchun maxsus yaratilgan keng qamrovli karyera platformasi. U iqtidorli talabalarni, innovatsion startuplarni va istiqbolli kompaniyalari birlashtirib, yosh mutaxassislarning o'z imkoniyatlarini kashf etishlari, ko'nikmalarini namoyon qilishlari va muvaffaqiyatli karyera yo'liga birinchi qadamni tashlashlariga yordam beradi.

### 🎯 Missiyamiz

O'zbekistonda karyera imkoniyatlarini demokratlashtirish orqali yagona platforma taqdim etish:
- Talabalar stajirovka, ish va startup imkoniyatlarini topa oladi
- Kompaniyalar eng yaxshi talantlarni topish va yollashi mumkin
- Startuplar investorlar va malakali jamoa a'zolari bilan bog'lanishi mumkin
- Ta'lim muassasalari bitiruvchilarning ishga joylashishini kuzatishi mumkin

## ✨ Imkoniyatlar

### 👥 Talabalar uchun
- **📝 Aqlli profil yaratish** - AI bilan ishga olish qog'ozi va portfel yaratish
- **💼 Ishlarni topish** - Ko'nikmalar va afzalliklarga asoslangan shaxsiy tavsiyalar
- **🚀 Startup markazi** - Startuplar bilan bog'lanish va tadbirkorlik imkoniyatlarini o'rganish
- **📊 Ko'nikmalarni baholash** - Avtomatik ko'nikma bo'shliqlarini tahlil qilish va o'rganish tavsiyalari
- **🎓 Karyera yo'nalishi bo'yicha yo'riqnoma** - AI bilan boshqariladigan karyera traektoriyasi rejalashtirish

### 🏢 Kompaniyalar uchun
- **🔍 Talantlarni topish** - Kengaytirilgan filtrlash va moslashtirish algoritmlari
- **📈 Analitika paneli** - Real vaqtli yollash metrikalari va tushunchalar
- **🤝 Hamkorlik vositalari** - Suxbatlashgan intervyu jadvallashtirish va aloqa
- **📱 Mobil birinchi dizayn** - Barcha qurilmalarda uzluksiz tajriba

### 🚀 Startuplar uchun
- **💡 Pitch platformasi** - Startupidingizni potensial investorlarga namoyish eting
- **👥 Jamoa qurish** - Ham-asoschilar va malakali jamoa a'zolarini toping
- **📊 Mablag'ni kuzatish** - Investitsiya raundlarini va investor aloqalarini boshqaring
- **🌐 Jamiyat markazi** - Mentorlar va boshqa tadbirkorlar bilan bog'laning

### 🛡️ Xavfsizlik va Performans
- **🔐 Korporativ xavfsizlik** - Uchun shifrlash va GDPR muvofiqligi
- **⚡ Chaqqon tezlik** - 99.9% ish vahti bilan optimallashtirilgan performans
- **🌍 Ko'p tilli qo'llab-quvvatlash** - O'zbek, rus va ingliz tillaridagi interfeyslar
- **📱 Moslashuvchan dizayn** - Har qanday qurilmada mukammal tajriba

## 🏗️ Arxitektura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend     │    │    Backend     │    │   Ma'lumotlar  │
│   (Next.js)    │◄──►│   (Express)    │◄──►│   Bazasi      │
│                 │    │                 │    │   (PostgreSQL) │
│ • React 19     │    │ • REST API     │    │                 │
│ • TypeScript   │    │ • JWT Auth     │    │ • Prisma ORM   │
│ • Tailwind     │    │ • Rate Limiting│    │ • Redis Cache   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Tashqi      │
                    │   Xizmatlar    │
                    │                 │
                    │ • Email (SMTP) │
                    │ • Bulut Saqlash│
                    │ • Analitika    │
                    └─────────────────┘
```

## 🛠️ Texnologik to'plam

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) - SSR/SSG bilan React framework
- **Til**: [TypeScript 5](https://www.typescriptlang.org/) - Tip xavfli ishlab chiqarish
- **Stil**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Komponentlar**: [Radix UI](https://www.radix-ui.com/) - Kirish imkoniyatli komponentlar kutubxonasi
- **Holatni boshqarish**: [Zustand](https://zustand-demo.pmnd.rs/) - Yengil holatni boshqarish
- **Shakllar**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) - Shakl validatsiyasi
- **Animatsiyalar**: [Framer Motion](https://www.framer.com/motion/) - Yumshoq animatsiyalar
- **Ma'lumotlarni olish**: [TanStack Query](https://tanstack.com/query) - Server holatini boshqarish

### Backend
- **Runtime**: [Node.js 18+](https://nodejs.org/) - JavaScript runtime
- **Framework**: [Express.js](https://expressjs.com/) - Veb-ilova framework
- **Til**: [TypeScript 5](https://www.typescriptlang.org/) - Tip xavfli ishlab chiqarish
- **Ma'lumotlar bazasi**: [PostgreSQL 15](https://www.postgresql.org/) - Bog'lanishli ma'lumotlar bazasi
- **ORM**: [Prisma](https://www.prisma.io/) - Tip xavfli ma'lumotlar bazasi to'plami
- **Autentifikatsiya**: [JWT](https://jwt.io/) - Xavfsiz tokenga asoslangan autentifikatsiya
- **Xavfsizlik**: [Helmet](https://helmetjs.github.io/) + [bcrypt](https://www.npmjs.com/package/bcryptjs)
- **Validatsiya**: [Zod](https://zod.dev/) - Shema validatsiyasi

### DevOps va Infrastruktura
- **Konteynerlashtirish**: [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)
- **Ma'lumotlar bazasini boshqarish**: [Prisma Studio](https://www.prisma.io/studio)
- **Kod sifati**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Versiyani nazorat qilish**: [Git](https://git-scm.com/) + [GitHub](https://github.com/)

## 🚀 Tezkor boshlash

### Talablar

Quyi dasturlarning o'rnatilganligiga ishonch hosil qiling:
- [Node.js](https://nodejs.org/) (v18 yoki yuqori)
- [npm](https://www.npmjs.com/) yoki [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) va [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### Bir bosish bilan o'rnatish (Tavsiya etiladi)

```bash
# Repozitoriyani klonlash
git clone https://github.com/otabekxoff-creator/step.uz.git
cd step.uz

# Barcha xizmatlarni Docker bilan ishga tushirish
docker-compose up -d

# Ilovani kirish
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Ma'lumotlar bazasi: localhost:5432
```

### Qo'lb bilan o'rnatish

#### 1. Klonlash va o'rnatish

```bash
# Repozitoriyani klonlash
git clone https://github.com/otabekxoff-creator/step.uz.git
cd step.uz

# Bog'liqliklarni o'rnatish
cd frontend && npm install
cd ../backend && npm install
```

#### 2. Ma'lumotlar bazasini o'rnatish

```bash
# PostgreSQL ni ishga tushirish (Docker yordamida)
docker run --name step_db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=step_uz -p 5432:5432 -d postgres:15-alpine

# Ma'lumotlar bazasi migratsiyalarini ishga tushirish
cd backend
npx prisma migrate dev
npx prisma generate
```

#### 3. Muhit konfiguratsiyasi

Muhit fayllarini yarating:

```bash
# Backend muhiti
cd backend
cp .env.example .env
# .env faylni o'z konfiguratsiyangiz bilan tahrirlang

# Frontend muhiti  
cd ../frontend
cp .env.example .env.local
# .env.local faylni o'z konfiguratsiyangiz bilan tahrirlang
```

#### 4. Ishlab chiqarish serverlarini ishga tushirish

```bash
# Backendni ishga tushirish (terminal 1)
cd backend
npm run dev

# Frontendni ishga tushirish (terminal 2)
cd frontend
npm run dev
```

Ilovani ko'rish uchun [http://localhost:3000](http://localhost:3000) manziliga tashrif buyuring.

## ⚙️ Konfiguratsiya

### Backend muhit o'zgaruvchilari

```env
# Ma'lumotlar bazasi
DATABASE_URL="postgresql://postgres:password@localhost:5432/step_uz"

# Autentifikatsiya
JWT_SECRET="your_super_secret_key_change_this_in_production"
JWT_EXPIRES_IN="7d"

# Server
NODE_ENV="development"
PORT="5000"
FRONTEND_URL="http://localhost:3000"

# Email (ixtiyoriy)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Faylni yuklash
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE="10485760" # 10MB
```

### Frontend muhit o'zgaruvchilari

```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 📁 Loyiha tuzilishi

```
step.uz/
├── 📂 frontend/                 # Next.js frontend ilovasi
│   ├── 📂 src/
│   │   ├── 📂 app/             # App Router sahifalari
│   │   ├── 📂 components/      # Qayta ishlatiladigan UI komponentlari
│   │   ├── 📂 hooks/           # Maxsus React hooklari
│   │   ├── 📂 lib/             # Yordamchi funktsiyalar
│   │   ├── 📂 stores/          # Zustand holatni boshqarish
│   │   ├── 📂 types/           # TypeScript tip ta'riflari
│   │   └── 📂 config/          # Konfiguratsiya fayllari
│   ├── 📂 public/              # Statik resurslar
│   ├── 📄 package.json
│   └── 📄 Dockerfile
├── 📂 backend/                  # Express.js backend API
│   ├── 📂 src/
│   │   ├── 📂 controllers/     # Route kontrollerlari
│   │   ├── 📂 middleware/      # Express middleware
│   │   ├── 📂 routes/          # API marshrutlari
│   │   ├── 📂 services/        # Biznes mantiq
│   │   ├── 📂 utils/           # Yordamchi funktsiyalar
│   │   └── 📄 app.ts           # Ilova kirish nuqtasi
│   ├── 📂 prisma/              # Ma'lumotlar bazasi sxemasi va migratsiyalar
│   ├── 📄 package.json
│   └── 📄 Dockerfile
├── 📄 docker-compose.yml        # Docker ishlab chiqarish muhiti
├── 📄 README.md                 # Bu fayl
└── 📄 .gitignore               # Git ignore qoidalari
```

## 🔧 Ishlab chiqarish

### Mavjud skriptlar

#### Frontend

```bash
npm run dev          # Ishlab chiqarish serverini ishga tushirish
npm run build        # Production uchun build qilish
npm run start        # Production serverini ishga tushirish
npm run lint         # ESLint ni ishga tushirish
npm run db:push      # Ma'lumotlar bazasi sxemasini yuborish
npm run db:generate  # Prisma clientini yaratish
npm run db:migrate   # Ma'lumotlar bazasi migratsiyalarini ishga tushirish
```

#### Backend

```bash
npm run dev          # Ishlab chiqarish serverini hot reload bilan ishga tushirish
npm run build        # TypeScriptni JavaScriptga kompilatsiya qilish
npm run start        # Production serverini ishga tushirish
npm run db:push      # Ma'lumotlar bazasi sxemasini yuborish
npm run db:generate  # Prisma clientini yaratish
npm run db:migrate   # Ma'lumotlar bazasi migratsiyalarini ishga tushirish
npm run db:studio    # Prisma Studioni ochish
```

### Kod sifati

Yuqori kod sifati standartlarini saqlaymiz:

- **TypeScript**: Qattiq tip tekshiruvi yoqilgan
- **ESLint**: Izchil kod uslubi uchun maxsus qoidalar
- **Prettier**: Avtomatik kod formatlash
- **Husky**: Sifatni ta'minlash uchun pre-commit hooklari
- **Conventional Commits**: Standartlashtirilgan commit xabarlari

### Git ish jarayoni

```bash
# Xususiyat shoxini yaratish
git checkout -b feature/amazing-feature

# O'zgarishlarni amalga oshirish va commit qilish
git add .
git commit -m "feat: amazing feature qo'shish"

# Push qilish va pull request yaratish
git push origin feature/amazing-feature
```

## 🐳 Docker orqali deployment

### Ishlab chiqarish muhiti

```bash
# Barcha xizmatlarni ishga tushirish
docker-compose up -d

# Loglarni ko'rish
docker-compose logs -f

# Xizmatlarni to'xtatish
docker-compose down
```

### Production deployment

```bash
# Build qilish va deployment qilish
docker-compose -f docker-compose.prod.yml up -d --build
```

### Docker buyruqlari

```bash
# Backend konteyneriga kirish
docker exec -it step_backend bash

# Ma'lumotlar bazasiga kirish
docker exec -it step_db psql -U postgres -d step_uz

# Konteyner holatini ko'rish
docker ps
```

## 📚 API hujjatlari

### Autentifikatsiya endpointlari

```http
POST /api/auth/register     # Foydalanuvchi ro'yxatdan o'tishi
POST /api/auth/login        # Foydalanuvchi tizimga kirishi
POST /api/auth/logout       # Foydalanuvchi chiqishi
GET  /api/auth/me           # Joriy foydalanuvchini olish
```

### Foydalanuvchini boshqarish

```http
GET    /api/users           # Barcha foydalanuvchilarni olish (admin)
GET    /api/users/:id       # ID bo'yicha foydalanuvchini olish
PUT    /api/users/:id       # Foydalanuvchi profilini yangilash
DELETE /api/users/:id       # Foydalanuvchini o'chirish (admin)
```

### Ishlar va Arizalar

```http
GET    /api/jobs            # Barcha ishlarni olish
POST   /api/jobs            # Ish yaratish (kompaniya)
GET    /api/jobs/:id        # Ish tafsilotlarini olish
PUT    /api/jobs/:id        # Ishni yangilash (kompaniya)
DELETE /api/jobs/:id        # Ishni o'chirish (kompaniya)

POST   /api/jobs/:id/apply  # Ishga ariza topshirish
GET    /api/applications     # Foydalanuvchi arizalarini olish
```

### Startuplar

```http
GET    /api/startups        # Barcha startuplarni olish
POST   /api/startups        # Startup yaratish
GET    /api/startups/:id    # Startup tafsilotlarini olish
PUT    /api/startups/:id    # Startupni yangilash
DELETE /api/startups/:id    # Startupni o'chirish
```

Batafsil API hujjatlari uchun ishlab chiqarish rejimida `/api/docs` manziliga tashrif buyuring.

## 🧪 Testlash

### Testlarni ishga tushirish

```bash
# Frontend testlari
cd frontend
npm test                    # Barcha testlarni ishga tushirish
npm run test:watch         # Kuzatish rejimi
npm run test:coverage      # Yopishqoq hisoboti

# Backend testlari
cd backend
npm test                   # Barcha testlarni ishga tushirish
npm run test:watch        # Kuzatish rejimi
npm run test:e2e          # Oxir-oqibat testlari
```

### Test tuzilishi

```
tests/
├── 📂 unit/               # Unit testlar
├── 📂 integration/        # Integratsiya testlari
├── 📂 e2e/               # Oxir-oqibat testlari
└── 📂 fixtures/           # Test ma'lumotlari
```

### Yopishqoq maqsadlari

- **Unit Testlar**: 80%+ yopishqoq
- **Integratsiya Testlari**: 70%+ yopishqoq
- **Oxir-oqibat Testlari**: Muhim foydalanuvchi oqimlari

## 🤝 Hissa qo'shish

Jamiyatdan hissa qo'shishni qutqinamiz! Bu siz yordam berishingiz mumkin:

### Boshlash

1. **Fork** qiling repozitoriyani
2. **Klon** qiling o'z forkingizni mahalliy ravishda
3. **Yarat** xususiyat shoxini
4. **Qiling** o'zgarishlaringiz
5. **Test** qiling chuqurlik bilan
6. **Yuboring** pull request

### Hissa qo'shish qoidalari

- [Xulq-atvora qoidalariga](CODE_OF_CONDUCT.md) amal qiling
- Aniq, tavsiflovchi commit xabarlari yozing
- Yangi funktsiyalar uchun testlar qo'shing
- Zarur bo'lsa, hujjatlarni yangilang
- Yuborishdan oldin barcha testlardan o'tganligiga ishonch hosil qiling

### Ishlab chiqarish sohalari

Biz quyidagi sohalarda yordam qidiramiz:

- 🎨 **UI/UX Yaxshilanishlari** - Dizayn va foydalanuvchi tajribasini yaxshilash
- 🔧 **Backend Funktsiyalari** - API ishlab chiqarish va biznes mantiq
- 📱 **Mobil Ilova** - React Native mobil ilovasi
- 🤖 **AI Funktsiyalari** - Aqlli tavsiyalar va avtomatlashtirish
- 🌍 **Xalqarolashtirish** - Til qo'llab-quvvatlash va lokalizatsiya
- 📊 **Analitika** - Ma'lumot tushunchalari va hisobotlash

### Muammolarni xabar qilish

Xatoliklarni xabar qilishda quyidagilarni kiriting:

- **Muammoning aniq tavsifi**
- **Muammoni takrorlash bosqichlari**
- **Kutilgan va haqiqiy xulq-atvora**
- **Muhit tafsilotlari** (OS, brauzer, versiya)
- **Rasmlar** agar mavjud bo'lsa

## 📄 Litsenziya

Bu loyiha MIT Litsenziyasi ostida litsenziyalangan - [LICENSE](LICENSE) faylini ko'ring.

```
MIT Litsenziyasi

Copyright (c) 2024 Step.uz

Bu dastur dasturiy nusxasini olish uchun litsenziyasiz bepul taqdim etilgan,
shu dasturiy nusxani va bog'liq hujjatlarni istalgan shaklda
foydalanish, ko'chirish, o'zgartirish, birlashtirish, nashr etish,
ko'paytirish, quyi litsenziya ostida tarqatish va/yoki nusxalash huquqi
berilgan, shunda dasturiy nusxani olgan shaxslar quyidagi shartlarga
rioya qilishlari shart:

Yuqoridagi mualliflik huquqi va ruxsatnomasi dasturiy nusxaning barcha
nusxalari yoki muhim qismlariga kiritilishi kerak.
```

## 🙏 Tashakkurlar

Quyidagilarga maxsus tashakkur:

- **O'zbekiston IT Jamiyati** - ilhom va qo'llab-quvvatlash uchun
- **Hissa qo'shuvchilar** - bu platformani qurishga yordam berganlar
- **Ta'lim muassasalari** - qimmatli fikr-mulohazalari uchun
- **Dastlabki foydalanuvchilar** - testlash va yaxshilanishlar uchun

## 📞 Aloqa

- **Veb-sayt**: [step.uz](https://step.uz)
- **Email**: [info@step.uz](mailto:info@step.uz)
- **GitHub**: [@otabekxoff-creator](https://github.com/otabekxoff-creator)
- **LinkedIn**: [Step.uz](https://linkedin.com/company/step-uz)

---

<div align="center">

**⭐ Agar bu repozitoriya sizga yordam berdi bo'lsa, yulduzcha bosing!**

O'zbekistonda ❤️ bilan yaratilgan

[🔝 Yuqoriga qaytish](#-step-uz---ozbekiston-yoshlari-uchun-karyera-platformasi)

</div>
