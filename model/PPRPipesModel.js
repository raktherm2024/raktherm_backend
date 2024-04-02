import mongoose from "mongoose";

const pprPipesSchema = new mongoose.Schema(
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

const PPR_Pipes = mongoose.model("PPR_Pipes", pprPipesSchema);

export default PPR_Pipes;
