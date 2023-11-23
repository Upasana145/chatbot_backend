const { resSend } = require("../utils/resSend.js");
const { query } = require("../db/db.js");

// let booking = {
//   dept: "",
//   drname: "",
//   date: "",
//   time: "",
// };

// // Chats
// exports.chatHandler = async (req, res) => {
//   const { type, dept, date, time, drname } = req.body;
//   console.log("hey i am typeeee", dept);
//   if (type === "OnlineBooking") {
//     try {
//       let sql = `SELECT name FROM depts`;
//       const result = await query({
//         query: sql,
//         values: [],
//       });
//       let cusRes = {
//         heading: "Please choose the department you want to contact",
//         body: result,
//       };
//       if (result && result.length > 0) {
//         resSend(res, true, 200, "Success retrive all depts", cusRes, null);
//       } else {
//         resSend(res, false, 200, "Data is not present!", result, null);
//       }
//     } catch (error) {
//       console.log(error);
//       resSend(res, false, 400, "Error", error, null);
//     }
//   } else if (type === "SelectedDept") {
//     try {
//       // let sql2 = `INSERT INTO booking (dept, drname, date, time)
//       // VALUES (?, ?, ?, ?) `;

//       // const result2 = await query({
//       //   query: sql,
//       //   values: [booking.dept, booking.drname, booking.date, booking.time],
//       // });
//       let sql = `SELECT t1.drname, t2.name FROM doctor as t1
//                 INNER JOIN depts as t2 ON t2.dept_id = t1.depts
//                 WHERE t2.name = "${dept}" `;

//       const result = await query({
//         query: sql,
//         values: [],
//       });

//       booking = { ...booking, dept };
//       let cusRes = {
//         heading: "Please choose the doctor you want to contact",
//         body: result,
//       };
//       if (result && result.length > 0) {
//         resSend(res, true, 200, "Success retrive all doctors", cusRes, null);
//       } else {
//         resSend(res, false, 200, "Data is not present!", result, null);
//       }
//     } catch (error) {
//       console.log(error);
//       resSend(res, false, 400, "Error", error, null);
//     }
//   } else if (type === "SelectedDoctor") {
//     booking = { ...booking, drname };
//     let cusRes = {
//       heading: "Please type date of appointment",
//     };
//     resSend(res, true, 200, "Please type date of appointment!", cusRes, null);
//   } else if (type === "SelectedDate") {
//     booking = { ...booking, date };
//     let cusRes = {
//       heading: "Please select timeslot of appointment",
//       body: [
//         {
//           time: "9am - 12pm",
//         },
//         {
//           time: "3pm - 9pm",
//         },
//       ],
//     };

//     try {
//       let sql = `INSERT INTO booking (dept, drname, date, time)
//       VALUES (?, ?, ?, ?) `;

//       const result = await query({
//         query: sql,
//         values: [booking.dept, booking.drname, booking.date, booking.time],
//       });

//       let insertCusRes = {
//         heading: "Appointment successfully booked!",
//         body: result,
//       };
//       resSend(
//         res,
//         true,
//         200,
//         "Appointment successfully booked!",
//         insertCusRes,
//         null
//       );
//       booking = {
//         dept: "",
//         drname: "",
//         date: "",
//         time: "",
//       };
//     } catch (error) {
//       console.log(error);
//       resSend(res, false, 400, "Error", error, null);
//     }

//     resSend(res, true, 200, "Please type date of appointment!", cusRes, null);
//   } else {
//     resSend(res, false, 200, "Please choose a correctype", null, null);
//   }
// };

// getDepts
exports.getDepts = async (req, res) => {
  try {
    let sql = `SELECT name FROM depts`;
    const result = await query({
      query: sql,
      values: [],
    });
    let arr = [];
    result.map((item) => {
      arr.push(item.name);
    });
    let modRes = {
      heading: "Please choose a department",
      para: "",
      suggestions: arr,
    };
    if (result && result.length > 0) {
      resSend(res, true, 200, "Success retrive all depts", modRes, null);
    } else {
      resSend(res, false, 200, "Data is not present!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};
// getDoctors by deptwise
exports.getDoctors = async (req, res) => {
  const { dept } = req.body;
  try {
    let sql = `SELECT t1.drname, t2.name FROM doctor as t1
                INNER JOIN depts as t2 ON t2.dept_id = t1.depts
                WHERE t2.name = "${dept}" `;

    const result = await query({
      query: sql,
      values: [],
    });

    if (result && result.length > 0) {
      resSend(res, true, 200, "Success retrive all doctors", result, null);
    } else {
      resSend(res, false, 200, "Data is not present!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};
// Booking
exports.bookings = async (req, res) => {
  const { dept, drname, date, time } = req.body;

  try {
    let sql = `INSERT INTO booking (dept, drname, date, time)
      VALUES (?, ?, ?, ?) `;

    const result = await query({
      query: sql,
      values: [dept, drname, date, time],
    });

    resSend(res, true, 200, "Appointment successfully booked!", result, null);
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};
