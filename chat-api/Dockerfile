FROM node:alpine

WORKDIR /app
COPY . .

RUN yarn
RUN chown node:node .

USER node

EXPOSE 3000

CMD [ "yarn", "start" ]
