import mongoose from "mongoose";

const pprFittingsSchema = new mongoose.Schema(
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

const PPR_Fittings = mongoose.model("PPR_Fittings", pprFittingsSchema);

export default PPR_Fittings;
