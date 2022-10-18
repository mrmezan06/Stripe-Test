const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const paymentRoutes = require("./routes/payment");
dotenv.config();

const app = express();

const FRONTEND_DEV_URLS = ["http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) =>
    FRONTEND_DEV_URLS.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS")),
};

app.use(cors(corsOptions));
app.use(express.json());

app.listen(process.env.PORT, (error) => {
  if (error) throw error;
  console.log("Server running on port: " + process.env.PORT);
});

app.use("/api", paymentRoutes);
