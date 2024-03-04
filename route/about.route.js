const about = (router) => {
  router.get("/about", (req, res) => {
    res.render("about");
  });
};

module.exports = about;
