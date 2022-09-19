FROM node:14

COPY dist ./server
COPY node_modules ./node_modules

ENV NODE_ENV="production"

EXPOSE 8080

CMD node ./server/main.js