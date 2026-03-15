FROM node:18-alpine

WORKDIR /app

# Dependency fayllarini nusxalash
COPY package*.json ./

# Dependency-larni o'rnatish
RUN npm install

# Barcha kodlarni nusxalash
COPY . .

# Next.js build qilish
RUN npm run build

# Portni ochish
EXPOSE 3000

# Standalone serverni ishga tushirish (package.json-dagi start scriptiga asosan)
CMD ["npm", "start"]
