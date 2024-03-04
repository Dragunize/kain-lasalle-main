const vendor = (router) => {
  router.get("/vendor", (req, res) => {
    res.render("vendor");
  });
};

module.exports = vendor;
