import mongoose from "mongoose";

const pexPipesSchema = new mongoose.Schema(
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

const PEX_Pipes = mongoose.model("PEX_Pipes", pexPipesSchema);

export default PEX_Pipes;
