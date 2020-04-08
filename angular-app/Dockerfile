#############
### build ###
#############

# base image
FROM node:12.16.1 as build

# set working directory
WORKDIR /my-app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /my-app/node_modules/.bin:$PATH

# install and cache app dependencies
# COPY package.json /my-app/package.json
# RUN npm install
RUN npm install -g @angular/cli@8.3.17
RUN echo "y" | ng new my-app --style=scss --skip-tests=true --directory ./

COPY package.json /my-app/package.json
RUN npm install

# add app
# COPY . /app
COPY src /my-app/src

# generate build
# RUN ng build --output-path=dist

CMD ["npm", "start"]

# expose port 4200
EXPOSE 4200

############
### prod ###
############

# base image
# FROM nginx:1.16.0-alpine

# # copy artifact build from the 'build environment'
# COPY --from=build /app/dist /usr/share/nginx/html

# # expose port 80
# EXPOSE 80

# # run nginx
# CMD ["nginx", "-g", "daemon off;"]
