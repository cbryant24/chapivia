// const nodemailer = require("nodemailer");
// const env = process.env.NODE_ENV || "development";
// const config = require("../../config").mailer[env];

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: config.email,
//     pass: config.password
//   }
// });

// const mailOptions = {
//   from: "kanye@west.com",
//   to: "cbryant23@gmail.com",
//   subject: "Graduation",
//   text: "Do you even remember what the issue you is"
// };

// // transporter.sendMail(mailOptions, function(error, info) {
// //   if (error) {
// //     console.log(error);
// //   } else {
// //     console.log("Email sent: " + info.response);
// //   }
// // });

// module.exports = transporter;
