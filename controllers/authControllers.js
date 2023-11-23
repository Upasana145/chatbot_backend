const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { resSend } = require("../utils/resSend.js");
const { query } = require("../db/db.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Login User
exports.loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    let sql = `SELECT email, password FROM auth WHERE email= '${email}' and isActive = 'Yes'`;

    const result = await query({
      query: sql,
      values: [],
    });
    if (result && result.length > 0) {
      // User exits, check passwords
      const pwIsCorrect = password == result[0]?.password;
      // const pwIsCorrect = await bcrypt.compare(password, result[0]?.password);
      if (pwIsCorrect) {
        const token = generateToken(email);
        resSend(res, true, 200, "Login Successful", result, token);
      } else {
        resSend(res, false, 200, "Password is invalid!", result, null);
      }
    } else {
      resSend(res, false, 200, "Email ID is invalid!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

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
