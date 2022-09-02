FROM node:16-alpine

WORKDIR /api

COPY . . 

# install yarn
RUN npm --force install --global yarn
RUN yarn install

EXPOSE 3333

USER node

CMD [ "yarn", "start" ]
