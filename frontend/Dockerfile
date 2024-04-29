FROM node:alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install


COPY . .
RUN npm run build

# Stage 2: Production image
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
# COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]