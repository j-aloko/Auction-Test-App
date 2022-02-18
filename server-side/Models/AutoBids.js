const mongoose = require("mongoose");

autoBidsSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, default: "" },
    amount: { type: Number, required: true },
    notify: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AutoBids", autoBidsSchema);
