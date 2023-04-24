FROM node:alpine

WORKDIR /reactapp
# add `/app/node_modules/.bin` to $PATH
ENV PATH /reactapp/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /reactapp/package.json

COPY . /reactapp/
RUN cd /reactapp/
RUN ls  -al
EXPOSE 3000
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

# start app
CMD ["npm", "start"]