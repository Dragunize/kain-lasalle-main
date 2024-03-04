const contact = (router) => {
  router.get("/contact", (req, res) => {
    res.render("contact");
  });
};

module.exports = contact;
