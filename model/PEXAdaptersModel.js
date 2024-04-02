import mongoose from "mongoose";

const pexAdaptersSchema = new mongoose.Schema(
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

const PEX_Adapters = mongoose.model("PEX_Adapters", pexAdaptersSchema);

export default PEX_Adapters;
