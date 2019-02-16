# JapaneseSteakhouse

A group project by the students at Shift_Up

Instructions for running locally:
  1. If you do not have NodeJS you will need to install it. NodeJS website: https://nodejs.org/en/. Be sure to install NPM with it. (If you already have node and npm installed you can skip the first 3 steps and just make sure to pull any new changes.)
  2. Open a bash terminal and change directors (cd for git bash) to the project root, pull any new changes.
  3. If this is the first time since the back end was added to the project you will need to run this command: npm install
    a. This is downloading all the packages the application depends on as indicated by the package.json file which should now be in your root directory.
  4. At this point you are ready to run the application. Run the following command: node app.js
    a. This will start your local server.
  5. To view your website locally at this point, open your browser and navigate to localhost:8000
  6. To close your server press Control + C

Notes:
  If you have a conflict on port 8000 you can set the port enviroment variable by starting your server with the following command: PORT=3000 node app.js (3000 was just an example, you can pick whatever port you know will not conflict with your computer.)
