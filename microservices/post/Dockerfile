FROM node:12.10.0-alpine

WORKDIR /SnowFlake/microservices/fridge

COPY package*.json ./
RUN npm ci -qy
RUN npm install --production=false

COPY . .
RUN tsc index.ts

EXPOSE 4000

CMD ["npm", "start"]