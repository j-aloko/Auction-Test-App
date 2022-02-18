const ListedProducts = require("../Models/ListedProducts");

const router = require("express").Router();

//List a Product

router.post("/", async (req, res) => {
  const newProduct = new ListedProducts(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Listed Product

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await ListedProducts.findOneAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get a single Listed Product

router.get("/find/:id", async (req, res) => {
  try {
    const product = await ListedProducts.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all lsited products
router.get("/", async (req, res) => {
  try {
    const products = await ListedProducts.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update bidders array whenever a user places a bid

router.put("/bid/:id", async (req, res) => {
  try {
    const listedProduct = await ListedProducts.findById(req.params.id);
    await listedProduct.updateOne({ $push: { bidders: req.body } });
    res.status(200).json("bid placed successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
