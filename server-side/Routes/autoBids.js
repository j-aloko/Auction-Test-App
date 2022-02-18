const AutoBids = require("../Models/AutoBids");

const router = require("express").Router();

// Save an autobid

router.post("/", async (req, res) => {
  const newAutoBid = new AutoBids(req.body);
  try {
    const savedAutoBid = await newAutoBid.save();
    res.status(200).json(savedAutoBid);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all autoBid

router.get("/", async (req, res) => {
  try {
    const autoBids = await AutoBids.find();
    res.status(200).json(autoBids);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
