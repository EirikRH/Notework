FROM node:alpine

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --omit-dev

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "container-start"]