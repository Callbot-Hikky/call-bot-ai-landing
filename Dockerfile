# Landing Astro (statique) : build Node -> service nginx.
FROM node:22-alpine AS build
WORKDIR /app

# URL de l'app, injectée au build (Astro fige les PUBLIC_* dans le HTML statique).
ARG PUBLIC_APP_URL=https://app.hikky.duckdns.org
ENV PUBLIC_APP_URL=$PUBLIC_APP_URL

COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
