FROM node:14

ENV BASE_PATH=/innbyggerpanelet

COPY . ./

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD node server.js