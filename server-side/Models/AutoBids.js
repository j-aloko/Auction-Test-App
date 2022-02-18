const mongoose = require("mongoose");

autoBidsSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, default: "" },
    amount: { type: Number, required: true },
    threshold: { type: Number, required: true, default: 0 },
    deductible: { type: Number, default: 0 },
    productIds: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AutoBids", autoBidsSchema);
