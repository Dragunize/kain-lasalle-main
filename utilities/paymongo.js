require("dotenv").config();

const paymongo_pk = process.env.PAYMONGO_PK;
const paymongo_sk = process.env.PAYMONGO_SK;

const checkout = async (line_items) => {
  const basicAuthString =
    "Basic " + Buffer.from(paymongo_sk).toString("base64");

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      authorization: basicAuthString,
    },
    body: JSON.stringify({
      data: {
        attributes: {
          send_email_receipt: false,
          show_description: false,
          show_line_items: true,
          line_items,
          payment_method_types: ["gcash"],
        },
      },
    }),
  };

  const checkout_url = await fetch(
    "https://api.paymongo.com/v1/checkout_sessions",
    options
  )
    .then((response) => response.json())
    .then((response) => response.data.attributes.checkout_url)
    .catch((err) => console.error(err));

  return checkout_url;
};

module.exports = { checkout };
