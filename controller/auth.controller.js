// Add all those functions that are related to authentication

const { getUserByEmail, getUserByUsername } = require("../db/users");

const showLoginPage = (req, res) => {
  res.render("index");
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Empty fields
    if (!email || !password)
      return res
        .status(200)
        .json({ success: false, message: "Email or Password is empty!" });

    const user = await getUserByEmail(email);

    // User not found
    if (!user)
      return res
        .status(200)
        .json({ success: false, message: "No existing user found!" });

    // Wrong password
    if (user.password !== password)
      return res
        .status(200)
        .json({ success: false, message: "Incorrect Password!" });

    res.cookie("kain-lasalle-user", email, {
      maxAge: 24 * 60 * 60 * 1000, //equivalent to one day
      path: "/",
    });

    // Send success status code.
    res.status(200).json({ success: true }).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("kain-lasalle-user");

  res.redirect("/login");
};

const showRegistrationPage = (req, res) => {
  res.render("register");
};

const showAdminLoginPage = (req, res) => {
  res.render("adlogin");
};

const signInAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Empty fields
    if (!username || !password)
      return res
        .status(200)
        .json({ success: false, message: "Username or Password is empty!" });

    const user = await getUserByUsername(username);

    // User not found
    if (!user)
      return res
        .status(200)
        .json({ success: false, message: "No existing user found!" });

    // User is not an admin
    if (user.type !== "admin")
      return res
        .status(200)
        .json({ success: false, message: "The user is not an admin!" });

    // Wrong password
    if (user.password !== password)
      return res
        .status(200)
        .json({ success: false, message: "Incorrect Password!" });

    res.cookie("kain-lasalle-user", user.email, {
      maxAge: 24 * 60 * 60 * 1000, //equivalent to one day
      path: "/",
    });

    // Send success status code.
    res.status(200).json({ success: true }).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  showLoginPage,
  signInUser,
  logoutUser,
  showRegistrationPage,
  showAdminLoginPage,
  signInAdmin,
};

// For future reference
// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const user = await User.findOne({ userName: username });

//     if (!user) {
//       res
//         .status(401)
//         .json({ success: false, message: "No existing user found!" });
//       return;
//     }

//     const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

//     if (hashedPassword === user.password) {
//       // Set a cookie with the user's email
//       // res.cookie("loggedInUserEmail", user.schoolEmail, { maxAge: 900000, httpOnly: true }); // Adjust maxAge as needed
//       res.status(200).json({ success: true });
//     } else {
//       res.status(401).json({ success: false, message: "Incorrect password" });
//     }
//   } catch (err) {
//     console.error("Error during login:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.post("/adlogin", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const userAduser = await User.findOne({ username });

//     if (!userAduser) {
//       res
//         .status(401)
//         .json({ success: false, message: "No existing admin found!" });
//       return;
//     }

//     if (password === User.password) {
//       // Add a message indicating successful login
//       res.status(200).json({ success: true, message: "Logging in..." });
//     } else {
//       res
//         .status(401)
//         .json({ success: false, message: "Incorrect password for admin" });
//     }
//   } catch (err) {
//     console.error("Error during admin login:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });
