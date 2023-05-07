const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { errorHandler } = require("./middleWare/errorHandler");

const app = express();
app.use(cors());

const port = process.env.PORT || 5002;

app.use(express.json());
const router = require("./routes/route");

app.use("/api/snake", router);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
