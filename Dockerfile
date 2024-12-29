# First stage: Build dependencies and generate Prisma client
FROM node:18-slim AS builder

WORKDIR /app

# Install system dependencies for bcrypt and Prisma
RUN apt-get update && apt-get install -y build-essential python3

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Second stage: Serve SSR app with Node.js
FROM node:18-slim

WORKDIR /app

# Copy the built output
COPY --from=builder /app/.svelte-kit/output /app

# Install production dependencies
COPY package*.json ./
RUN npm install --production

EXPOSE 3000

CMD ["node", ".svelte-kit/output/server/index.js"]