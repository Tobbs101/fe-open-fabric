const express = require("express");
const Router = express.Router();

const db = require("../model");
const Product = db.product;
const auth = require("../middleware/auth");

Router.get("/api/v1.0/product/all", auth, async (req, res) => {
  try {
    const product = await Product.findAll();
    return res.status(200).send({ success: false, product });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
});

Router.post("/api/v1.0/product", auth, async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productAvailability,
    } = req.body;

    if (
      productName === "" ||
      productDescription === "" ||
      productPrice === "" ||
      productAvailability === ""
    ) {
      return res.status(400).json({ error: "Invalid product details..." });
    }

    const newProduct = {
      productName: productName,
      productDescription: productDescription,
      productPrice: productPrice,
      productAvailability: productAvailability,
    };

    const savedProduct = await Product.create(newProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the product" });
  }
});

Router.patch("/api/v1.0/product/:id", auth, async (req, res) => {
  try {
    const checkProduct = await Product.findOne({
      where: { id: req.params.id },
    });
    if (!checkProduct)
      return res
        .status(400)
        .send({ success: false, message: "Product not found" });
    await Product.update({ ...req.body }, { where: { id: req.params.id } });
    const product = await Product.findOne({ where: { id: req.params.id } });
    return res.status(200).send({ success: false, product });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
});

Router.get("/api/v1.0/product/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product)
      return res
        .status(400)
        .send({ success: false, message: "Product not found" });

    return res.status(200).send({ success: false, product });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
});

Router.delete("/api/v1.0/product/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product)
      return res
        .status(400)
        .send({ success: false, message: "Product not found" });
    await Product.destroy({ where: { id: req.params.id } });
    return res
      .status(200)
      .send({ success: false, message: "Product Deleted!" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = Router;
