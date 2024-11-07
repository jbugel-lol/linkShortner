FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 6969

CMD ["npm", "run", "dev"]