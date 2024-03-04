const shop = (router) => {
  router.get("/shops", (req, res) => {
    res.render("shops");
  });
};

module.exports = shop;
