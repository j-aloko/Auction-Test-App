const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const { expressCspHeader, INLINE, NONE, SELF } = require("express-csp-header");
const listedProductsRoute = require("./Routes/listedProducts");
const autoBidsRoute = require("./Routes/autoBids");
const cors = require("cors");

dotenv.config();

app.use(
  cors({
    origin: [
      "https://bidify-auction-hub.herokuapp.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.listen(process.env.PORT || 8080, () => {
  console.log("server is running");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to Mongo_DB"))
  .catch((err) => console.log("MongoDB connection failed"));

app.use(
  expressCspHeader({
    directives: {
      "default-src": [SELF],
      "script-src": [SELF, INLINE, "somehost.com"],
      "style-src": [SELF, "mystyles.net"],
      "img-src": ["data:", "images.com"],
      "worker-src": [NONE],
      "block-all-mixed-content": true,
    },
  })
);

app.use(morgan("common"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json());
app.use("/api/products", listedProductsRoute);
app.use("/api/autobids", autoBidsRoute);
