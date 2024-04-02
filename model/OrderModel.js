import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    orderNo: {
      type: String,
    },
    orders: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        itemName: {
          type: String,
        },
        itemCode: {
          type: String,
        },
        quantity: {
          type: String,
        },
        oem: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      default: "Unfinished",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
