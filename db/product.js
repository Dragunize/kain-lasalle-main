const Product = require("../schema/productSchema");

const getProducts = () => Product.find();
const getProductsByUserId = (user_id) => Product.find({ user_id });
const getProductById = (id) => Product.findById(id);
const getProductByIdAndUserId = (id, user_id) =>
  Product.findOne({ _id: id, user_id });
const getProductByName = (name) => Product.findOne({ name });
const createProduct = (values) =>
  new Product(values).save().then((product) => product.toObject());
const deleteProductById = (id) => Product.findByIdAndDelete(id);
const updateProductById = (id, values) => Product.findByIdAndUpdate(id, values);

module.exports = {
  getProducts,
  getProductsByUserId,
  getProductById,
  getProductByIdAndUserId,
  getProductByName,
  createProduct,
  deleteProductById,
  updateProductById,
};
