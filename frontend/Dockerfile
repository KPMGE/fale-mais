FROM node:16-alpine

WORKDIR /site

COPY . . 

# install yarn
RUN npm --force install --global yarn
RUN yarn install && yarn build

USER node

EXPOSE 3000

CMD [ "yarn", "start" ]
