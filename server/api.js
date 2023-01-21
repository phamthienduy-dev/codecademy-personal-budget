const express = require("express");
const bodyParser = require("body-parser");

const envelopsRouter = require("./envelops");
const app = express();

const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use("/envelops", envelopsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
