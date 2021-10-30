
# from base image node
FROM node:lts-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY ./backend/package.json ./

# install all dependencies
RUN npm install

# copy oter files as well
COPY ./backend ./

#expose the port
EXPOSE 3000

# command to run when intantiate an image
CMD ["npm","run", "dev"]
