FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy built application
COPY dist/ ./dist/
COPY public/ ./public/

# Create server/public directory structure and copy dist content there
RUN mkdir -p server/public && \
    cp -r dist/* server/public/

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]