require("dotenv").config();

const express = require("express");

const cors = require("cors");
const app = express();

// Import routes
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

// settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));
// app.use("/uploads", express.static("uploads"));

// use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);

const PORT = process.env.PORT || 4000;
// console.log("PORT:", PORT);
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// Notes

// require("dotenv").config();


// Absolutely! Imagine you have a secret code for your program, like a password or a special number. Instead
//of putting that secret directly into your code, which might not be safe, you can use a special file (like a
//secret vault) called .env to store these secrets. The line require("dotenv").config(); helps your program open
// this vault and use those secrets when needed. This way, your secrets are kept safe, and you can easily manage
// different secrets for different situations, like when your program is testing, developing, or running for real.

//require("dotenv").config();

//require("dotenv"): This part imports the "dotenv" module into your Node.js application. The require function
//is a fundamental part of Node.js that allows you to include external modules in your code.

//.config() method is used to read the content of .env files and sets the environment variables defined in that file.

//sets the environment variables  means that-->
//values specified in the .env file are made available to the running program as environment variables.

//..env File:
//a configuration file that contains key-value pairs of environment variables.

//Setting Environment Variables:

//When you run the require("dotenv").config(); line in a Node.js application, it reads the
//contents of the .env file and sets these key-value pairs as environment variables
//that your program can access.

//const app =  express();
//In this case, the express function is used to create a new instance of an Express application.
//I'm creating a new Express application, and I'll refer to it as 'app' in my code."

//const authRoutes = require("./routes/authRoutes");

//"I'm importing the authentication routes from the './routes/authRoutes' file, and
// I'll refer to them as 'authRoutes' in my code."

//In simpler terms, this line is bringing in a set of code that defines routes related to authentication
// (like login, logout, etc.) from a separate file.

//app.use(express.json());
//tells your Express app to be ready to handle incoming data in the form of JSON (JavaScript Object Notation).
//It's like telling your app, "Hey, if someone sends you information in JSON format, make sure
//you can understand and process it."

//line is indicating that your Express application should be prepared to handle incoming data in JSON format.
// This is commonly used when dealing with API requests, where clients send data to the server in JSON form.
// The middleware (express.json()) helps your server understand and process that JSON data.
//it's a middleware designed to handle and process JSON data sent to your server.


//app.use(express.urlencoded({ extended: true })); 

// is setting up middleware in your Express application to handle data sent in the URL-encoded format.
//In simpler terms, app.use(express.urlencoded({ extended: true })); is telling your Express application to be ready to handle incoming data from HTML forms or other sources that use URL-encoded parameters. It makes it easier for your server to understand and work with this type of data.
//app.use(...): The use method in Express is used to mount middleware functions. In this case, it's saying, "Hey Express, use this middleware for all incoming requests."


/*
Certainly! URL-encoded parameters are a way of representing data within the URL (Uniform Resource Locator) of a web request. In this encoding scheme, special characters are replaced with a percent sign followed by two hexadecimal digits. Additionally, spaces are often replaced by the plus sign (+) or percent-encoded as `%20`.

Here's a simple example to illustrate URL-encoded parameters:

Suppose you have a form on a webpage with two fields, "name" and "age". When the user submits the form, the data is sent to the server using a URL-encoded format. If the user enters "John Doe" for the name and "25" for the age, the data might look like this in URL-encoded form:

```
name=John+Doe&age=25
```

Breaking it down:

- `name=John+Doe`: This represents the "name" parameter with the value "John Doe". The space is replaced by the plus sign (+).
- `&`: This separates parameters in the URL.
- `age=25`: This represents the "age" parameter with the value "25".

The entire string, `name=John+Doe&age=25`, is then appended to the URL, usually following a question mark (?) in the URL structure.

In Express, when you use `app.use(express.urlencoded({ extended: true }));`, you're telling your server to expect and parse data in this URL-encoded format. This way, when a form is submitted to your server, you can easily access the form data in your route handlers using `req.body`.
*/

//app.use(cors("*"))
// is setting up your Express application to allow cross-origin resource sharing (CORS) with any origin.
//cors("*"): CORS is a security feature implemented by web browsers to restrict webpages from making requests 
//to a different domain than the one that served the original webpage. 
//"*" in cors("*")  => you're allowing requests from any origin, which is less restrictive.
//app.use(...): The use method in Express is used to mount middleware functions.
// In this case, it's saying, "Hey Express, use this CORS middleware for all incoming requests.
//app.use(cors("*"));: This line combines the use of middleware with the specific CORS middleware allowing any origin.



