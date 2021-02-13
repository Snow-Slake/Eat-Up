FROM node:12.10.0-alpine

WORKDIR /SnowFlake/microservices/post/cache

COPY redis.conf .
RUN apk add redis && mkdir -p "/etc/redis/" && cp redis.conf /etc/redis/redis.conf

COPY package*.json ./
RUN npm ci -qy
RUN npm install --production=false

COPY . .

EXPOSE 3000

CMD redis-server & npx ts-node index.ts