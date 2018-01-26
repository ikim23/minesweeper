FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm install -g yarn
