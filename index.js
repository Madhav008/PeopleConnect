const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const morgan = require("morgan");

const userRoute = require("./routes/auth");
const companyRoute = require("./routes/company");
const socialRoute = require("./routes/social");
const contactRoute = require("./routes/contact");
const feedbackRoute = require("./routes/feedback");
const imagesRoute = require("./routes/images");
const templateRoute = require("./routes/template");
const ecommerceRoute = require("./routes/ecommerce");
const paymentRoute = require("./routes/payment");

//Lod env vars

dotenv.config({ path: "./config/config.env" });

//Connect To Databse
connectDB();

const app = express();

app.use(express.json());
// Dev Logging Middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Mount Routes
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/ecommerce", ecommerceRoute);
app.use("/api/v1/template", templateRoute);
app.use("/api/v1/social", socialRoute);
app.use("/api/v1/images", imagesRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/feedback", feedbackRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
