# JapaneseSteakhouse Project

##### A group project by the students of Shift_Up #####

# Prerequisites for running this project locally #
1. You will need to have nodejs installed on your machine. (https://nodejs.org/en/)
2. You will need a valid link to a MongoDB Atlas database.
  1. If you are a student of Shift_Up please ask for a link in the slack channel under group projects.
3. You will need to have git installed. (https://git-scm.com/download)

# To install the project locally #
1. (These commands are using git bash (terminal) for windows, they may vary depending on what OS you are using.) Navigate to 
where you want the project to live on your machine.
  1. (For MacOS and linux the paths will be different, but the commands should be the same. COMMAND = cd PATH = /c/ShiftUpRepos)
  If the directory does not already exist you can use this line: mkdir /c/ShiftUpRepos && cd /c/ShiftUpRepos. If the directory 
  already exists use this command: cd /path/to/project/root.
2. Copy the project from github to your machine.
  1. git clone git@github.com:nina-barraco/JapaneseSteakhouse.git
3. Navigate to the root of the project that now lives on your computer.
  1. cd JapaneseSteakhouse
4. Install all the modules Node is using for this project.
  1. npm install
5. Set up .env file
  1. (It's easier to set this file up from a code editor like visual studio code or sublime, but for the sake of consistency 
  we will do it from terminal) cp ./.env.sample.txt ./.env
  2. Replace the value assigned to DB_URL with the valid link to your MongoDB Atlas database.

# To run your local server #
1. If you do not have nodemon installed globally on your machine use any of these commands...
  1. npm run start-node
  2. node app.js
2. If you have nodemon installed on your machine you can use any of these commands...
  1. npm run start-node
  2. node app.js
  3. nodemon app.js
  4. npm start

# Contributors #
1. Because this app is still in development, there are changes being made to it fairly regularly, so be sure to pull changes 
down before you start making changes.
  1. git pull
2. If there are any changes to the package.json file or if you are not sure, check with npm for updates after pulling.
  1. npm install
3. When you are ready to push your changes up to github
  1. git add file/to/be/added more/files/to/be/added
  2. git commit -m "message attached to your commit for others to view"
  3. git push origin master (If we were using branches it would be: git push origin <branch>)
