if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import express from "express";
import cors from "cors";
import router from "./routers/index.js";
import Router from "./routes/route.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
const app = express();

const PORT = process.env.PORT || 80;
import connect from "./db.js";
// const db = require("./db");
connect();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
//middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));

//headers
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

//api
app.use("/api", router);
app.use("/", Router);

app.listen(PORT, () => {
  console.log(`AskCUI API is running on PORT No- ${PORT}`);
});

// const url =

//   "mongodb+srv://umair:umair@blog.ne0ye.mongodb.net/BLOG?retryWrites=true&w=majority";

// mongoose
//   .connect(url, {
//     useNewUrlParser: true,
//     // useFindAndModify: false,
//     useUnifiedTopology: true,
//     // useCreateIndex: true,
//   })
//   .then(() => console.log("MongoDB is connected successfully"))
//   .catch((err) => console.log("Error: ", err));
