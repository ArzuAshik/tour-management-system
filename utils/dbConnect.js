const { MongoClient } = require("mongodb");
const colors = require('colors');
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("tours");
      console.log("Successfully Connected to MongoDB.".underline.bold.yellow);

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
