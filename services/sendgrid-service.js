const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(toEmail) {
  try {
    const res = await sgMail.send({
      to: toEmail,
      from: "jarimesina1234@gmail.com",
      subject: "Someone wants to apply to your company!",
      text: "Please contact user",
      html: "<strong>Someone wants to apply to your company</strong>",
    });

    return res[0];
  } catch (err) {
    console.log("error", err);
    return err;
  }
}

module.exports = {
  sendEmail,
};
