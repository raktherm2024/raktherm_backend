import mongoose from "mongoose";

const dbConn = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log("bogo"));
};

export default dbConn;
