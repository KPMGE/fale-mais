FROM node:16-alpine

WORKDIR /site

COPY . . 

# install yarn
RUN npm --force install --global yarn
RUN yarn install 

EXPOSE 3333

USER node

CMD [ "yarn", "dev" ]
