const {
  getProductByIdAndUserId,
  getProductByName,
  updateProductById,
} = require("../db/product");
const { getUserById } = require("../db/users");
const { checkout } = require("../utilities/paymongo");

const getCheckoutUrl = async (req, res) => {
  try {
    const { line_items } = req.body;

    const checkoutURL = await checkout(line_items);

    // subtract quantity on the product stock
    line_items.forEach(async (line_item) => {
      const product = await getProductByName(line_item.name);
      if (!product)
        return res
          .status(200)
          .json({
            success: false,
            message: "The product does not exist.",
          })
          .end();
      const stock = product.stock - line_item.quantity;
      await updateProductById(product._id.toString(), { stock });
    });

    // Send success status code.
    res.status(200).json({ success: true, checkoutURL }).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getCartDetails = async (req, res) => {
  try {
    const { food_store, food, quantity } = req.body;

    const user = await getUserById(food_store);
    if (!user)
      return res
        .status(200)
        .json({
          success: false,
          message: "The vendor does not exist.",
        })
        .end();

    const product = await getProductByIdAndUserId(food, food_store);
    if (!product)
      return res
        .status(200)
        .json({
          success: false,
          message: "The product does not exist.",
        })
        .end();

    if (product.stock < quantity)
      return res
        .status(200)
        .json({
          success: false,
          message: "Please input an amount less than to the current stock.",
        })
        .end();

    // Send success status code.
    return res
      .status(200)
      .json({
        success: true,
        cart: {
          food_store: user.fullName,
          food: product.name,
          quantity,
          price: product.price,
        },
      })
      .end();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { getCheckoutUrl, getCartDetails };
