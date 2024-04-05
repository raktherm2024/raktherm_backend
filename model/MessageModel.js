import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sentFrom: {
      type: String,
    },
    name: {
      type: String,
    },
    sentTo: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
