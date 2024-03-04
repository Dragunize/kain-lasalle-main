const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  user_id: {
    type: String,
    select: false,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
});

const Product = model("Product", productSchema);
module.exports = Product;
