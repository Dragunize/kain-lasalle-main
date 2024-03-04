const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ejsMate = require("ejs-mate");
const { ConnectMongoDB, PORT } = require("./utilities/general");

// Routes - Taki Fimito
const routes = require("./route");
const cookieParser = require("cookie-parser");

const app = express();
ConnectMongoDB();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("views"));

// ROUTING SHOULD BE DONE LIKE THIS! - Taki Fimito
// Create a single main route. (route/index.js)
app.use("/", routes());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
