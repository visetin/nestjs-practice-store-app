FROM node:20-alpine AS building
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY --from=building /app/dist ./dist

CMD [ "npm", "run", "start:prod" ]
