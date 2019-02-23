#! /bin/bash

# set environment variables like which ports the app will use.
export PORT=3000
export MONGO_PORT=27017

# try and detect if user has nodemon installed, if so run app using nodemon, else use node
type nodemon
if [ $? -eq 0 ]
then
  echo "You have nodemon installed, running the program through nodemon"
  nodemon app.js
else
  echo "You do not have nodemon installed, running the app through node"
  node app.js
fi

# if you run into issues with the server process running on after the app should have closed it use these commands
# ps ax (this will echo the current running processes)
# kill <Process ID> (replace Process ID with the process id shown by the previous command)
