FROM node:20-alpine AS building
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS running
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]