// Created by Taki Fimito
const {
  showLoginPage,
  showRegistrationPage,
  signInUser,
  logoutUser,
} = require("../controller/auth.controller");
const { isGuest, isAuthenticated } = require("../middlewares");

const auth = (router) => {
  router.get("/login", isGuest, showLoginPage);
  router.post("/login", isGuest, signInUser);
  router.get("/logout", isAuthenticated, logoutUser);
  router.get("/register", isGuest, showRegistrationPage);
};

module.exports = auth;
