# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16 as builder
# Set the working directory to /app inside the container
WORKDIR /app/frontend
COPY . .
RUN npm install --force
RUN npm run build
EXPOSE 3000
# Start the app
CMD [ "npm", "run", "start" ]

# FROM nginx:alpine
# # Set working directory to nginx asset directory
# WORKDIR /usr/share/nginx/html
# # Remove default nginx static assets
# # RUN rm -rf ./*
# # Copy static assets from builder stage
# COPY --from=builder /app/frontend/dist .
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 3000
# # Containers run nginx with global directives and daemon off
# CMD ["nginx", "-g", "daemon off;"]