FROM node:14

COPY dist ./dist
COPY node_modules ./node_modules

ENV NODE_ENV="production"
ENV IS_PROD=yes

EXPOSE 8081

CMD node ./dist/main.js