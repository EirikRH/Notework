FROM node:alpine

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --omit-dev

COPY . .

RUN npx prisma generate

EXPOSE 80

CMD ["node", "server.js"]