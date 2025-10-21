# Базовий образ Node.js
FROM node:22-alpine

# Робоча директорія всередині контейнера
WORKDIR /usr/src/app

# Копіюємо package.json і встановлюємо залежності
COPY package*.json ./
RUN npm install

# Копіюємо код
COPY . .

# Будуємо NestJS
RUN npm run build

# Відкриваємо порт
EXPOSE 3000

# Запускаємо сервер
CMD ["npx", "prisma", "migrate", "deploy", "&&", "npm", "run", "start:dev"]
