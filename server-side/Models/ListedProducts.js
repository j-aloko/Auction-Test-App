const mongoose = require("mongoose");

listedProductsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: "" },
    description: { type: String, required: true },
    img: { type: String, required: true, default: "" },
    minimumBid: { type: Number, required: true, default: 0 },
    endDate: { type: Number, required: true, default: 0 },
    bidders: [
      {
        fullname: { type: String, required: true },
        amount: { type: Number, required: true },
        budget: { type: Number, required: true },
        autoBid: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ListedProducts", listedProductsSchema);
