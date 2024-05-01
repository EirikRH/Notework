
FROM nginx:alpine

COPY ./dist usr/share/nginx/html

ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]