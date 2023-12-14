const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { resSend } = require("../utils/resSend.js");
const { query } = require("../db/db.js");
const SENDMAIL = require("../utils/mailSend.js");
const HTML_TEMPLATE = require("../utils/mail-template.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Login And Generate OTP
exports.loginHandler = async (req, res) => {
  const { email } = req.body;
  try {
    let sql = `SELECT * FROM auth WHERE email= '${email}' and isActive = 'Y'`;

    const result = await query({
      query: sql,
      values: [],
    });
    if (result && result.length > 0) {
      // GENERATE OTP
      const generatedOTP = Math.floor(100000 + Math.random() * 900000);

      // Store OTP in auth table
      let sqlUpdate = `UPDATE auth SET otp = ? WHERE auth_id = ?`;

      const resUpdate = await query({
        query: sqlUpdate,
        values: [generatedOTP, result[0]?.auth_id],
      });

      // Send OTP to registered email
      let mailDetails = {
        from: "safety.sudisafoundry@gmail.com",
        to: result[0]?.email,
        subject: "OTP Verifcation | CHATBOT",
        html: HTML_TEMPLATE(generatedOTP),
      };
      SENDMAIL(mailDetails, function (err, data) {
        if (!err) {
          console.log("Error Occurs", err);
        } else {
          console.log("Email sent successfully");
        }
      });

      // response
      resSend(res, true, 200, "OTP has been sent!", null, null);
    } else {
      resSend(res, false, 200, "Email ID is invalid!", null, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// VerifyOTP
exports.verifyOTP = async (req, res) => {
  const { enteredOTP, email } = req.body;
  try {
    let sql = `SELECT * FROM auth WHERE email= '${email}' and isActive = 'Y'`;

    const result = await query({
      query: sql,
      values: [],
    });

    if (result && result.length > 0) {
      // Check OTP is correct or not
      if (result[0].otp === enteredOTP) {
        let sqlUpdate = `UPDATE auth SET otp = ? WHERE email = '${email}'`;

        const resUpdate = await query({
          query: sqlUpdate,
          values: [""],
        });
        let modRes = {
          id: result[0].auth_id,
          email: result[0].email,
        };
        const token = generateToken(email);
        resSend(res, true, 200, "Login Successfull!", modRes, token);
      } else {
        resSend(res, false, 200, "OTP is incorrect!", null, null);
      }
    } else {
      resSend(res, false, 200, "USER ID is invalid!", null, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// Login User
// exports.loginHandler = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let sql = `SELECT email, password FROM auth WHERE email= '${email}' and isActive = 'Yes'`;

//     const result = await query({
//       query: sql,
//       values: [],
//     });
//     if (result && result.length > 0) {
//       // User exits, check passwords
//       const pwIsCorrect = password == result[0]?.password;
//       // const pwIsCorrect = await bcrypt.compare(password, result[0]?.password);
//       if (pwIsCorrect) {
//         const token = generateToken(email);
//         resSend(res, true, 200, "Login Successful", result, token);
//       } else {
//         resSend(res, false, 200, "Password is invalid!", result, null);
//       }
//     } else {
//       resSend(res, false, 200, "Email ID is invalid!", result, null);
//     }
//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 400, "Error", error, null);
//   }
// };

//Registration
exports.registrationHandler = async (req, res) => {
  const {
    fname,
    lname,
    dob,
    gender,
    address,
    postalcode,
    country,
    passportno,
    visanovisatype,
    email,
    mobileno,
    password,
  } = req.body;

  try {
    const emailExists = await query({
      query: "SELECT COUNT(*) as count FROM auth WHERE email = ?",
      values: [email],
    });

    if (emailExists[0].count > 0) {
      resSend(res, false, 400, "Email already exists", null, null);
      return;
    }

    let sql = `INSERT INTO auth (fname, lname, dob, gender, address, postalcode, country, passportno, visanovisatype, email, mobileno, password )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const result = await query({
      query: sql,
      values: [
        fname,
        lname,
        dob,
        gender,
        address,
        postalcode,
        country,
        passportno,
        visanovisatype,
        email,
        mobileno,
        password,
      ],
    });

    resSend(res, true, 200, "Registration successful!", result, null);
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

exports.registrationHandler2 = async (req, res) => {
  const { email } = req.body;

  try {
    const emailExists = await query({
      query: "SELECT COUNT(*) as count FROM auth WHERE email = ?",
      values: [email],
    });

    if (emailExists[0].count > 0) {
      resSend(res, false, 400, "Email already exists", null, null);
      return;
    }

    let sql = `INSERT INTO auth (email, isActive) VALUES (?, ?)`;

    const result = await query({
      query: sql,
      values: [email, "Y"],
    });

    resSend(res, true, 200, "Registration successful!", result, null);
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// Notes:-
// Check if the email already exists in the database
// const emailExists = await query({
//   query: "SELECT COUNT(*) as count FROM auth WHERE email = ?",
//   values: [email],
// });

// if (emailExists[0].count > 0) {
//   // If email already exists, send an error response
//   resSend(res, false, 400, "Email already exists", null, null);
//   return;
// }

// // If email is unique, proceed with registration
// let sql = `INSERT INTO auth (fname, lname, dob, gender, address, postalcode, country, passportno, visanovisatype, email, mobileno, password )
//   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
