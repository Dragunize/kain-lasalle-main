const User = require("../schema/userSchema");

const registerUser = async (req, res) => {
  try {
    const { type, email, fullName, userName, password } = req.body;

    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "Username already exists. Please choose a different one.",
      });
    }

    const result = await new User({
      type,
      email,
      fullName,
      userName,
      password,
    }).save();

    // Redirect to login page upon successful registration
    return res.redirect("/login");
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { registerUser };
