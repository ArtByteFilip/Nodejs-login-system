const express = require("express");
const app = express();
const http = require("http");
const { setegid } = require("process");
const server = http.createServer(app);

var usernameReg, passwordReg;
var session = 0;

usernameReg = "filipko";
passwordReg = "filipko";

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const { usernamee, passwordd } = req.body;

  if (session == 1) {
    res.sendFile(__dirname + "/admin.html");
  } else {
    if (usernamee == usernameReg) {
      if (passwordd == passwordReg) {
        console.log("Prihlásenie prebehlo úspešne!");
        session = 1;
        res.sendFile(__dirname + "/admin.html");
      } else {
        console.log("Prihlásenie neprebehlo úspešne!");
        res.sendFile(__dirname + "/login.html");
      }
    } else {
      console.log("Prihlásenie neprebehlo úspešne!");
      res.sendFile(__dirname + "/login.html");
    }
  }
});

app.post("/logoutTP", (req, res) => {
    if (session == 1) {
        session = 0;
        res.sendFile(__dirname + "/login.html");
      } else {
        console.log("Nie ste prihlásení!");
        res.sendFile(__dirname + "/login.html");
      }
});

app.post("/registerTP", (req, res) => {
  if (session == 1) {
    res.sendFile(__dirname + "/register.html");
  } else {
    console.log("Nie ste prihlásení!");
    res.sendFile(__dirname + "/login.html");
  }
});

app.post("/loginTP", (req, res) => {
  if (session == 0) {
    res.sendFile(__dirname + "/login.html");
  } else {
    console.log("Nie ste prihlásení!");
    res.sendFile(__dirname + "/admin.html");
  }
});

app.post("/adminTP", (req, res) => {
  if (session == 1) {
    res.sendFile(__dirname + "/admin.html");
  } else {
    console.log("Nie ste prihlásení!");
    res.sendFile(__dirname + "/login.html");
  }
});

app.post("/register", (req, res) => {
  const { username, password, passwordConfirm } = req.body;

  if (session == 1) {
    if (username.length > 4) {
      usernameReg = username;
      if (password.length > 7) {
        if (passwordConfirm == password) {
          passwordReg = password;
          console.log("Registrácia prebehla úspešne!");
          res.sendFile(__dirname + "/login.html");
        } else {
          console.log("Heslo sa musí zhodovať!");
          res.sendFile(__dirname + "/register.html");
        }
      } else {
        console.log("Heslo musí obsahovať minimálne 8 znakov!");
        res.sendFile(__dirname + "/register.html");
      }
    } else {
      console.log("Meno musí obsahovať minimálne 4 znaky!");
      res.sendFile(__dirname + "/register.html");
    }
  } else {
    res.sendFile(__dirname + "/login.html");
  }
});

server.listen(9000, () => {
  console.log("listening on *:9000");
});