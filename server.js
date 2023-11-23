// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "eedhospital",
// });
// db.connect((err) => {
//   if (err) {
//     console.error("Database connection error: " + err.message);
//   } else {
//     console.log("Database connection established");
//   }
// });

// app.post("/signup", (req, res) => {
//   const sql =
//     "INSERT INTO auth(`name`, `email`, `password`, `datetime`) VALUES(?, ?, ?, ?)";

//   const values = [
//     req.body.name,
//     req.body.email,
//     req.body.password,
//     req.body.datetime,
//   ];

//   console.log("valueeeesss", values);

//   //   db.query(sql, [values], (err, data) => {
//   //     if (err) {
//   //       return res.json("Error");
//   //     }
//   //     return req.json(data);
//   //   });
//   db.query(sql, values, (err, data) => {
//     if (err) {
//       console.error("Error while inserting data: " + err.message);
//       return res.status(500).json("Error");
//     }
//     console.log("Data inserted successfully");
//     return res.status(200).json("Success");
//   });
// });

// app.post("/login", (req, res) => {
//   const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
//   db.query(sql, [req.body.Email, req.body.Password], (err, data) => {
//     if (err) {
//       return res.json("Error");
//     }
//     if (data.length > 0) {
//       return res.json("Success");
//     } else {
//       return res.json("Fail");
//     }
//   });
// });

// app.listen(8081, () => {
//   console.log("listening");
// });

// ----------------------------->

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors()
  // {
  // origin: ["http://localhost:3000"],
  // methods: ['POST', "GET"],
  // credentials: true
  // }
);
app.use(express.json());
app.use(cookieParser());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "eedhospital",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

const salt = 10; // Define the number of salt rounds for bcrypt

// // ... (existing code above)

// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ Error: "You are not authenticated" });
//   } else {
//     console.log(
//       "heyyyyy i am tokennn --------->",
//       token,
//       "<--------------------heyyyyy i am tokennn"
//     );
//     // console.log("heyyyyy i am tokennn --------->",jwt-secret-key,"<--------------------heyyyyy i am tokennn" )

//     jwt.verify(token, "jwt-secret-key", (err, decoded) => {
//       if (err) {
//         return res.json({ Error: "Token is not okay" });
//       } else {
//         req.name = decoded.name;
//         next();
//       }
//     });
//   }
// };

// app.get("/", verifyUser, (req, res) => {
//   return res.json({ Status: "Success", name: req.name });
// });

app.post("/signup", (req, res) => {
  const sql =
    "INSERT INTO auth (`name`, `email`, `password`,`datetime`) VALUES (?, ?, ?, ?)";

  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.json({ Error: "Error for hashing password" });
    }

    const values = [req.body.name, req.body.email, req.body.datatime, hash];
    console.log(
      "heyyyy i am value----------->",
      values,
      "<----------------------heyyyy i am value"
    );

    db.query(sql, values, (err, result) => {
      console.log(values, " hey i am valueeeeee inside db queryyyy");
      console.log(res, "hey i am responseeeeeeeeeeeeeeee inside  dbqeryy");

      if (err) {
        console.error("Error inserting data:", err);
        return res.json({ Error: "Inserting data Error in server" });
      }

      return res.json({ Status: "Success" });
    });
  });
});

app.get("/show", (req, res) => {
  const sql = "SELECT * FROM auth";
  db.query(sql, (err, result) => {
    console.log(result, "hey i am responseeeeeeeeeeeeeeee inside  dbqeryy");

    if (err) {
      console.error("Error inserting data:", err);
      return res.json({ Error: "Inserting data Error in server" });
    }

    return res.json({ Status: "Success" });
  });
});

// app.post("/signup", (req, res) => {
//   const checkEmailSql = "SELECT COUNT(*) AS count FROM login WHERE email = ?";

//   console.log(
//     "heeeyyyyyyyyyyyyyyyyyyyyyyy i am teq.body.email--------->",
//     req.body.email,
//     "<-----------------heeeyyyyyyyyyyyyyyyyyyyyyyy i am teq.body.email"
//   );
//   db.query(checkEmailSql, [req.body.email], (err, result) => {
//     if (err) {
//       console.error("Error checking email:", err);
//       return res.json({ Error: "Error checking email" });
//     }

//     console.log("heeeeeyyyyyyyyyyyyyyyyyyyyyyyyyy cuteee");
//     console.log(
//       "Hey i am result ---------------------------->",
//       result[0],
//       "<--------------------------hey i am result"
//     );

//     if (result[0].count > 0) {
//       console.log("Email already existed");
//       // return res.json({ Error: 'Email ID already exists in the database' });
//     } else {
//       const sql =
//         "INSERT INTO login (`firstname`, `lastname`, `email`, `password`) VALUES (?, ?, ?, ?)";
//       bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
//         if (err) {
//           console.error("Error hashing password:", err);
//           return res.json({ Error: "Error for hashing password" });
//         }

//         const values = [
//           req.body.firstname,
//           req.body.lastname,
//           req.body.email,
//           hash,
//         ];
//         console.log(
//           "heyyyy i am value----------->",
//           values,
//           "<----------------------heyyyy i am value"
//         );

//         db.query(sql, values, (err, result) => {
//           if (err) {
//             console.error("Error inserting data:", err);
//             return res.json({ Error: "Inserting data Error in server" });
//           }

//           return res.json({ Status: "Success" });
//         });
//       });
//     }
//   });
// });

// app.post("/login", (req, res) => {
//   const sql = "SELECT * FROM login WHERE `email` = ?";
//   console.log(
//     "req.body.password---------------------------->",
//     req.body.password,
//     "<--------------------------req.body.password"
//   );
//   db.query(sql, [req.body.email], (err, data) => {
//     if (!req.body.email || !req.body.password) {
//       return res.json({ Error: "Email and password fields are required." });
//     }

//     console.log(
//       "i am sqllll---------------->>>>",
//       sql,
//       "<----------------i am sqllll"
//     );
//     console.log(
//       "i am req.body.email---------------->>>>",
//       req.body.email,
//       "<----------------i am req.body.email"
//     );

//     if (err) {
//       console.error("Error querying data:", err);
//       return res.json({ Error: "Login error in server" });
//     }

//     if (data.length > 0) {
//       console.log(
//         "i am data.length---------------->>>>",
//         data.length,
//         "<----------------i am data.length"
//       );
//       console.log(
//         "i am data[0]---------------->>>>",
//         data[0],
//         "<----------------i am data[0]"
//       );
//       console.log(
//         "i am password---------------->>>>",
//         req.body.password,
//         "<----------------i am password"
//       );
//       console.log(
//         "i am password string---------------->>>>",
//         req.body.password.toString(),
//         "<----------------i am password"
//       );

//       bcrypt.compare(
//         req.body.password.toString(),
//         data[0].password,
//         (err, response) => {
//           console.log(
//             "i am responseeee---------------->>>>",
//             response,
//             "<----------------i am responseee"
//           ); // giving error
//           console.log(
//             "i am req.body.password---------------->>>>",
//             req.body.password,
//             "<----------------i am req.body.password"
//           );
//           console.log(
//             "i am data[0].password,---------------->>>>",
//             data[0].password,
//             "<----------------i am data[0].password,"
//           );

//           if (err) return res.json({ Error: "Password compare error" });

//           if (response) {
//             const name = data[0].name;
//             const token = jwt.sign({ name }, "jwt-secret-key", {
//               expiresIn: "1d",
//             });
//             res.cookie("token", token);
//             return res.json({ Status: "Success" });
//           } else {
//             return res.json({ Error: "Password not matched" });
//           }
//         }
//       );
//     } else {
//       return res.json({ Error: "No email existed" });
//     }
//   });
// });

// app.get("/logout", (req, res) => {
//   res.clearCookie("token"); // Clear the cookie named 'token'
//   return res.json({ Status: "Success" });
// });

app.listen(8081, () => {
  console.log("listening");
});
