const { isAuthenticated } = require("../middlewares");
const { getUserByEmail } = require("../db/users");

const profile = (router) => {
  router.get("/profile", isAuthenticated, (req, res) => {
    res.render("profile");
  });

  router.get("/profile-info", isAuthenticated, async (req, res) => {
    try {
      const email = req.cookies["kain-lasalle-user"];
      if (!email) return res.sendStatus(403);

      const existingUser = await getUserByEmail(email);
      if (!existingUser) return res.sendStatus(403);

      const { fullName, userName } = existingUser;
      return res
        .status(200)
        .json({ success: true, user: { fullName, userName, email } });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  });
};

module.exports = profile;
