# JapaneseSteakhouse

A group project by the students at Shift_Up

Instructions for running locally:
  1. If you do not have NodeJS you will need to install it. NodeJS website: https://nodejs.org/en/. Be sure to install NPM with it. (If you already have node and npm installed you can skip the first 3 steps and just make sure to pull any new changes.)
  2. Open a bash terminal and change directors (cd for git bash) to the project root, pull any new changes.
  3. If this is the first time since the back end was added to the project you will need to run this command: npm install
    a. This is downloading all the packages the application depends on as indicated by the package.json file which should now be in your root directory.
  4. At this point, you are ready to run the application. Run the following command: node app.js
    a. This will start your local server.
  5. To view your website locally at this point, open your browser and 
navigate to localhost:8000 (example: http://localhost:8000)
  6. To close your server press Control + C

Notes:
  This application will default to port 8000, however if that is an issue for your computer environment you can change that very easily in two different ways. 1. You can set the PORT variable right before starting the application (example: PORT=3000 node app.js). 2. In your .env file you can set an environment variable (example: add this line below the DB_URL variable, PORT=3000).
  In the package.json there are two scripts specified to start the server, one is for node, the other is for nodemon. To run nodemon you can use <npm start>, to run node use <npm run-script start-node>.

Pushing to Github:
  1. git add <file path relative to root of project> (you can use <.> instead, however this will add anything that has been changed instead of specifically adding what you want to the staging area on git.)
  2. git commit -m "<commit message>" (if you forget to add a message to the git commit you will most likely be brought to a vim editor in bash. if this happens you need to press <'i'> (Note, the quotes inside the brackets are not part of the command, you just need to press the i key) and type your message ("message"). when you are done press <:> then type <wq> and hit enter.
  3. git push origin <branch>