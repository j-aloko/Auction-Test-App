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

//Update autobid Configuration

router.put("/:id", async (req, res) => {
  try {
    const updatedAutobid = await AutoBids.findOneAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAutobid);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update products Array with Ids of products you enabled autobid

router.put("/update/:id", async (req, res) => {
  try {
    const autoBid = await AutoBids.findById(req.params.id);
    if (!autoBid.productIds.includes(req.body.productId)) {
      await autoBid.updateOne({ $push: { productIds: req.body.productId } });
      res.status(200).json("autobid enabled for this product");
    } else {
      await autoBid.updateOne({ $pull: { productIds: req.body.productId } });
      res.status(200).json("You disabled autobid");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
