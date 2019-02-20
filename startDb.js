var MongoPort = process.env.PORT || 27017;
process.env.MONGO_DB = `mongodb://localhost:${MongoPort}`;
process.env.PORT = 3000;
nodemon app.js;
