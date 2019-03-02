#! /bin/bash

# TODO figure out how to check if a port is in use

# set environment variables like which ports the app will use.
export PORT=3000
export MONGO_PORT=27017
MONGO_PATH=$(which mongo)

# check if user has mongo installed, if not they will have to install it
CHECK=$(type "${MONGO_PATH}")
if [ $? -ne 0 ]
  then
    echo "You need to have mongo installed to run this app. Other possible issue is mongo is not an environment variable."
    exit 1
  else
    echo "You have mongo installed, continuing."
fi

# try and detect if user has nodemon installed, if so run app using nodemon, else use node
CHECK=$(type nodemon)
if [ $? -eq 0 ]
then
  echo "You have nodemon installed, running the app through nodemon."
  nodemon app.js
else
  CHECK=$(type node)
  if [ $? -eq 0 ]
  then
    echo "You do not have nodemon installed, running the app through node."
    node app.js
  else
    echo "You do not have nodemon or node installed, you cannot run this app without one of these programs. Please read the README.md file for instructions on installing node."
    exit 1
  fi
fi

# if you run into issues with the server process running on after the app should have closed it use these commands
# ps ax (this will echo the current running processes)
# kill <Process ID> (replace Process ID with the process id shown by the previous command)
