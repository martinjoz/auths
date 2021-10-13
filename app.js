//requiring express node js module
let express = require("express");
let userRoutes = require("./routes/userRoutes");
let projectRoute = require("./routes/projectRoute");
let mailRoute = require("./routes/mailRoute");
let invoiceRoute = require("./routes/invoiceRoute");
let domainRoute = require("./routes/domainRoute");
let viewRoutes = require("./routes/viewsRoutes");
let errorController = require("./controller/errorcontroller");

let cookieParser = require("cookie-parser");
let path = require("path");
const pug = require("pug");
let compression = require("compression");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
let xss = require("xss-clean");
let cors = require("cors");

//initialize express
let app = express();
app.use(cors());
app.options("*", cors());
app.enable("trust proxy");
app.use(cookieParser());
app.use(compression());
//website rendering with PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

app.use(function (req, res, next) {
  // console.log("middleware running");
  next();
});

app.use(helmet());
// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   bookingcontroller.receiveWebhook
// );
//limiting request json to 10kb
app.use(express.json());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));
app.use(mongoSanitize());
app.use(xss());

let limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

app.use("/", viewRoutes);
app.use("/api/", limiter);
app.use("/api/v1/users", userRoutes);

// app.get("/", function (req, res, next) {
//   res.json({
//     status: "success",
//     location: "home",
//   });
// });

app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/mail", mailRoute);
app.use("/api/v1/invoice", invoiceRoute);
app.use("/api/v1/domain", domainRoute);

app.use("*", function (req, res, next) {
  res.json({
    status: "failled",
    message: "Route not set",
  });
  // res.status(200).render("_404");
});

app.use(errorController);
module.exports = app;
