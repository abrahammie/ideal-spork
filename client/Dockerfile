# Build the bundle and copy files
FROM node:carbon as builder
COPY package.json /app/package.json
WORKDIR /app/
RUN npm install
COPY . ./
RUN npm run build

# Serve the bundle
FROM nginx:1.12
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]