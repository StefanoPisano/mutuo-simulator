FROM node:20-alpine AS build
LABEL authors="stefano"

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.26-alpine

COPY --from=build /app/dist /usr/share/nginx/html/mutuo-simulator
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]