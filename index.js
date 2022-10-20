const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const dbConnect = require("./utils/dbConnect");
const toolsRoutes = require("./routes/v1/tours.route.js");
const errorHandler = require("./middleware/errorHandler");
// const { connectToServer } = require("./utils/dbConnect");
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
mongoose.connect('mongodb://localhost:27017/tours')
  .then(() => {
    console.log("DB Connected".yellow.bold)
  }).catch(err => {
    console.log(err)
    console.log("connection Failed!".red.bold);
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