require("colors");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const toolsRoutes = require("./routes/v1/tours.route.js");
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// connectToServer((err) => {
//   if (!err) {
//     app.listen(port, () => {
//       console.log(`Example app listening on port ${port}`.blue);
//     });
//   } else {
//     console.log(err);
//   }
// });

// db connection
const key = "mongodb+srv://arzu:AR12345678@cluster0.e2upviu.mongodb.net/?retryWrites=true&w=majority"
// process.env.DATABASE
mongoose.connect(key)
  .then(() => {
    console.log("DB Connected".yellow.bold)
  }).catch(err => {
    console.log("error message",err)
    console.log("DB Connection Failed :'(".red.bold);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`.blue);
});



// const connection = mongoose.connect('mongodb://localhost:27017/tours', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// console.log(connection);
app.use("/api/v1/tours", toolsRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public");
});

app.all("*", (req, res) => {
  res.send("No route found.");
});

app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
