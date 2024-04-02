import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customerCode: {
      type: String,
    },
    customerName: {
      type: String,
    },
    location: {
      type: String,
    },
    location: {
      type: String,
    },
    contact: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
