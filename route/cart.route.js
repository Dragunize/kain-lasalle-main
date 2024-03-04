const {
  getCheckoutUrl,
  getCartDetails,
} = require("../controller/cart.controller");
const { isAuthenticated } = require("../middlewares");

const cart = (router) => {
  router.get("/cart", isAuthenticated, (req, res) => {
    res.render("cart");
  });
  router.post("/checkout", getCheckoutUrl);
  router.post("/cart/details", getCartDetails);
};

module.exports = cart;
