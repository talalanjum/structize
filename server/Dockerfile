# Stage 1: Build Node.js app
FROM node:20

ARG MONGO_URI

ENV MONGO_URI=${MONGO_URI}

# Expose port
EXPOSE 4242

# Set the working directory for the Node.js server
WORKDIR /usr/src/server

# Copy package.json and package-lock.json for the Node.js server
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code for the Node.js server
COPY . .

CMD ["node", "app.js"]