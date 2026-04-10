FROM node:24.13.0-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]