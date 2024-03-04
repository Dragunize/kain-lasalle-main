// Main Route - Taki Fimito

const { Router } = require("express");
const auth = require("./auth.route");
const { isAuthenticated } = require("../middlewares");
const shop = require("./shop.route");
const about = require("./about.route");
const contact = require("./contact.route");
const admin = require("./admin.route");
const cart = require("./cart.route");
const profile = require("./profile.route");
const vendor = require("./vendor.route");

const router = Router();

const routes = () => {
  // Root Directory
  router.get("/", isAuthenticated, (req, res) => {
    res.render("homepage");
  });

  //ADD THE ROUTES
  auth(router);
  shop(router);
  about(router);
  contact(router);
  admin(router);
  cart(router);
  profile(router);
  vendor(router);
  return router;
};

module.exports = routes;
