const { getProductsByUserId } = require("../db/product");
const { getUserByEmail } = require("../db/users");

const fetchProductsOfVendor = async (req, res) => {
  try {
    const email = req.cookies["kain-lasalle-user"];
    if (!email)
      return res
        .status(200)
        .json({ success: true, message: "Email not found on cookie" })
        .end();

    const existingUser = await getUserByEmail(email);
    if (!existingUser)
      return res
        .status(200)
        .json({ success: true, message: "User not found" })
        .end();

    const products = await getProductsByUserId(existingUser._id.toString());
    res.status(200).json({ success: true, existingUser, products }).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { fetchProductsOfVendor };
