FROM node:18-alpine

WORKDIR /app

# Dependency fayllarini nusxalash
COPY package*.json ./
COPY prisma ./prisma/

# Barcha dependency-larni o'rnatish
RUN npm install

# Barcha kodlarni nusxalash
COPY . .

# Prisma client-ni generatsiya qilish va TypeScript-ni build qilish
RUN npx prisma generate
RUN npm run build

# Portni ochish
EXPOSE 5000

# Production rejimida ishga tushirish
CMD ["npm", "start"]
