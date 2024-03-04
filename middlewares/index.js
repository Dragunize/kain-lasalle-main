const { merge } = require("lodash");
const { getUserByEmail } = require("../db/users");

const isGuest = async (req, res, next) => {
  try {
    const email = req.cookies["kain-lasalle-user"];
    if (!email) return next();

    const existingUser = await getUserByEmail(email);
    if (!existingUser) return next();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const email = req.cookies["kain-lasalle-user"];
    if (!email) return res.redirect("/login");

    const existingUser = await getUserByEmail(email);
    if (!existingUser) return res.redirect("/login");

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const email = req.cookies["kain-lasalle-user"];
    if (!email) return res.redirect("/login");

    const existingUser = await getUserByEmail(email);
    if (!existingUser) return res.redirect("/login");

    if (existingUser.type !== "admin") return res.redirect("/");

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = { isAdmin, isAuthenticated, isGuest };
