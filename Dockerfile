# Dockerfile

# Use the official Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy pnpm lockfile and package.json to install dependencies
COPY pnpm-lock.yaml package.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Command to run the Vite development server
CMD ["pnpm", "run", "dev", "--", "--host"]


# FROM node:18-alpine
# WORKDIR /app

# # Install essential build tools and dependencies
# RUN apk add --no-cache python3 make g++

# # Copy package files
# COPY package.json pnpm-lock.yaml ./

# # Install pnpm and dependencies
# RUN npm install -g pnpm && \
#     pnpm install && \
#     pnpm add -D esbuild rollup vite@latest @vitejs/plugin-react typescript @types/node @types/react @types/react-dom

# # Copy the rest of the application
# COPY . .

# # Set host to allow external access
# ENV VITE_HOST=0.0.0.0

# EXPOSE 5173

# # Start development server
# CMD ["pnpm", "run", "dev", "--host"]

