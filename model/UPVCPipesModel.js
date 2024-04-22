import mongoose from "mongoose";

const upvcPipesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    items: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

const UPVC_Pipes = mongoose.model("UPVC_Pipes", upvcPipesSchema);

export default UPVC_Pipes;
