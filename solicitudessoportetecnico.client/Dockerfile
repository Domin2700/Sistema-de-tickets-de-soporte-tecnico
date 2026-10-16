
# Etapa 1: compilar Angular
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: servidor web
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Angular puede generar la salida en browser/ o directamente en dist/
COPY --from=build /app/dist/solicitudessoportetecnico.client/browser/ /usr/share/nginx/html/

EXPOSE 80
