const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// ✅ Insert sample products
router.post("/seed", async (req, res) => {
  try {
    const products = [
      {
        name: "Running Shoes",
        price: 120,
        category: "Footwear",
        variants: [
          { color: "Red", size: "M", stock: 10 },
          { color: "Blue", size: "L", stock: 5 }
        ]
      },
      {
        name: "Winter Jacket",
        price: 200,
        category: "Apparel",
        variants: [
          { color: "Black", size: "S", stock: 8 },
          { color: "Gray", size: "M", stock: 12 }
        ]
      },
      {
        name: "Smartphone",
        price: 699,
        category: "Electronics",
        variants: []
      }
    ];

    await Product.insertMany(products);
    res.status(201).send({ message: "Sample products inserted!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ✅ Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// ✅ Filter by category
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category });
  res.status(200).json(products);
});

// ✅ Filter products by variant color
router.get("/by-color/:color", async (req, res) => {
  const { color } = req.params;
  const products = await Product.find({ "variants.color": color });
  res.status(200).json(products);
});

module.exports = router;
