# Etapa de build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine
COPY --from=builder /app/dist/biblioteca-final-practica-front /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]