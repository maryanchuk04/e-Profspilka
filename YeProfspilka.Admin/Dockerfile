# base image
FROM node:16.15.1

WORKDIR /angularapp

# install and cache app dependencies
RUN ls
COPY package.json /angularapp/package.json
RUN npm -v
RUN npm install -g @angular/cli@14.2.8
RUN ng --help
RUN npm install --force

# add app
COPY . /angularapp

RUN cd /angularapp
EXPOSE 4200
# start app
CMD ["ng", "serve", "--host", "0.0.0.0"]