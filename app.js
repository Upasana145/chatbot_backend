// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const app = express();

// app.use(express.json());

// app.use(cors());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "eedhospital",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("Connected to the database");
// });

// app.get("/show/:param1/:param2", (req, res) => {
//   let param1 = req.params.param1;
//   let param2 = req.params.param2;
//   console.log("get method");
//   console.log(param1, param2);
//   param1 = param1 + 25;
//   res.json({ param1: param1, param2: param2 });
//   console.log(res);
// });

// app.post("/show", (req, res) => {
//   let param1 = req.body.param1;
//   let param2 = req.body.param2;
//   console.log(req);
//   console.log("post method");
//   console.log(param1, param2);
//   param1 = param1 + 20;

//   res.json({ param1: param1, param2: param2 });
// });

// app.get("/showdata", (req, res) => {
//   const sql = "SELECT * FROM auth";
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error inserting data:", err);
//       return res.json({ Error: "Inserting data Error in server" });
//     }
//     return res.json({ Status: "Success", result: result });
//   });
// });

// app.post("/signup", (req, res) => {
//   const sql = "INSERT INTO auth (`name`, `email`, `password`) VALUES (?, ?, ?)";

//   // bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
//   // if (err) {
//   //   console.error("Error hashing password:", err);
//   //   return res.json({ Error: "Error for hashing password" });
//   // }

//   const values = [req.body.name, req.body.email, req.body.password];
//   console.log(
//     "heyyyy i am value----------->",
//     values,
//     "<----------------------heyyyy i am value"
//   );

//   db.query(sql, values, (err, result) => {
//     // console.log(values, " hey i am valueeeeee inside db queryyyy");
//     // console.log(res, "hey i am responseeeeeeeeeeeeeeee inside  dbqeryy");

//     if (err) {
//       console.error("Error inserting data:", err);
//       return res.json({ Error: "Inserting data Error in server" });
//     }

//     return res.json({ Status: "Success" });
//   });
//   // });
// });

// // login handler

// app.post("/login", (req, res) => {
//   // const sql = "SELECT * FROM login WHERE `email` = ?";
//   // console.log(
//   //   "req.body.password---------------------------->",
//   //   req.body.password,
//   //   "<--------------------------req.body.password"
//   // );

//   let sql = `SELECT * FROM auth where isActive = 'Yes'`;
//   // db.query(sql, [req.body.email], (err, data) => {
//   //   if (!req.body.email || !req.body.password) {
//   //     return res.json({ Error: "Email and password fields are required." });
//   //   }

//   //   console.log(
//   //     "i am sqllll---------------->>>>",
//   //     sql,
//   //     "<----------------i am sqllll"
//   //   );
//   //   console.log(
//   //     "i am req.body.email---------------->>>>",
//   //     req.body.email,
//   //     "<----------------i am req.body.email"
//   //   );

//   //   if (err) {
//   //     console.error("Error querying data:", err);
//   //     return res.json({ Error: "Login error in server" });
//   //   }

//   //   if (data.length > 0) {
//   //     console.log(
//   //       "i am data.length---------------->>>>",
//   //       data.length,
//   //       "<----------------i am data.length"
//   //     );
//   //     console.log(
//   //       "i am data[0]---------------->>>>",
//   //       data[0],
//   //       "<----------------i am data[0]"
//   //     );
//   //     console.log(
//   //       "i am password---------------->>>>",
//   //       req.body.password,
//   //       "<----------------i am password"
//   //     );
//   //     console.log(
//   //       "i am password string---------------->>>>",
//   //       req.body.password.toString(),
//   //       "<----------------i am password"
//   //     );

//   //     bcrypt.compare(
//   //       req.body.password.toString(),
//   //       data[0].password,
//   //       (err, response) => {
//   //         console.log(
//   //           "i am responseeee---------------->>>>",
//   //           response,
//   //           "<----------------i am responseee"
//   //         ); // giving error
//   //         console.log(
//   //           "i am req.body.password---------------->>>>",
//   //           req.body.password,
//   //           "<----------------i am req.body.password"
//   //         );
//   //         console.log(
//   //           "i am data[0].password,---------------->>>>",
//   //           data[0].password,
//   //           "<----------------i am data[0].password,"
//   //         );

//   //         if (err) return res.json({ Error: "Password compare error" });

//   //         if (response) {
//   //           const name = data[0].name;
//   //           const token = jwt.sign({ name }, "jwt-secret-key", {
//   //             expiresIn: "1d",
//   //           });
//   //           res.cookie("token", token);
//   //           return res.json({ Status: "Success" });
//   //         } else {
//   //           return res.json({ Error: "Password not matched" });
//   //         }
//   //       }
//   //     );
//   //   } else {
//   //     return res.json({ Error: "No email existed" });
//   //   }
//   // });
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error inserting data:", err);
//       return res.json({ Error: "Inserting data Error in server" });
//     }
//     return res.json({ Status: "Success", result: result });
//   });
// });

// app.listen(8000, () => {
//   console.log("listening");
// });

//for practice only....

const express = require("express");
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Route to handle a POST request with JSON data
app.get("/api/users/:param1/:p2", (req, res) => {
  // req.body now contains the parsed JSON data
  const userData = req.body;
  console.log(userData);

  // Your logic to process the data (e.g., save it to a database)

  res.send("Data received and processed successfully!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
