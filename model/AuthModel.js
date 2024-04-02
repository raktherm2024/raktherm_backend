import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    userType: {
      type: String,
      default: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
