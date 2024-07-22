FROM node:19-bullseye
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env ./
RUN npm run build
EXPOSE ${APP_PORT}
CMD ["npm", "run", "start:prod"]