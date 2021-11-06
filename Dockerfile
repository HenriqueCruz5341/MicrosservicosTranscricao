FROM node:14.15.4-alpine3.12

WORKDIR /usr/app

CMD npm install && npm run start:dev