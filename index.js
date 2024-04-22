import express from "express";
import dotenv from "dotenv";
import dbConn from "./config/dbConn.js";
import customerRoutes from "./routes/CustomerRoutes.js";
import employeeRoutes from "./routes/EmployeeRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import templateRoutes from "./routes/TemplateRoutes.js";
import messageRoutes from "./routes/MessageRoutes.js";
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
    "http://localhost:5173",
    "http://localhost:5174",
    "https://raktherm-backend.vercel.app",
    "https://raktherm-client.vercel.app",
    "https://raktherm-backend.vercel.app/",
    "https://raktherm-client.vercel.app/",
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api/customers", customerRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/messages", messageRoutes);
app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
