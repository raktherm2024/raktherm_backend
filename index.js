import express from "express";
import dotenv from "dotenv";
import dbConn from "./config/dbConn.js";
import customerRoutes from "./routes/CustomerRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
dbConn();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://raktherm-backend.vercel.app",
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
