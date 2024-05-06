# Stage 1: Build Next.js app
# Use a Node.js base image for building Next.js app
FROM node:20 as build

# Set server url
ENV NEXT_PUBLIC_SERVER_URL="http://35.159.76.144:4242/"

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build Next.js app
RUN npm run build

# Use a lightweight Node.js base image for running Next.js app
FROM node:20-alpine3.18

# Set working directory
WORKDIR /usr/src/app

# Copy built app from the previous stage
COPY --from=build /usr/src/app .

# Expose port
EXPOSE 80

# Command to run the Next.js server
CMD ["npm", "start"]