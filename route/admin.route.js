const {
  showAdminLoginPage,
  signInAdmin,
} = require("../controller/auth.controller");
const { fetchProductsOfVendor } = require("../controller/product.controller");
const { isGuest, isAdmin } = require("../middlewares");

const admin = (router) => {
  router.get("/admin", isAdmin, (req, res) => {
    res.render("admin");
  });

  router.get("/admin/products", isAdmin, fetchProductsOfVendor);

  router.get("/adlogin", isGuest, showAdminLoginPage);

  router.post("/adlogin", isGuest, signInAdmin);
};

module.exports = admin;
