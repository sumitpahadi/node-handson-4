const express = require("express");
const jwt = require("jsonwebtoken");
const userauth = require("./middleware");
const dotenv = require("dotenv");
const cors = require("cors");
const data = require("./data");
const bcrypt = require("bcrypt");

dotenv.config();

const secretkey = process.env.secretkey;
const number = 10;
const port = 5001;
const app = express();
const arr = [];

app.use(express.json());
app.use(cors());
app.use("/middle", userauth);

app.get("/home", (req, res) => {
  res.send(data);
});

app.post("/register", (req, res) => {
  const data1 = req.body;
  console.log(data1);

  const existingItem = arr.find((item) => item.email === data1.email);
  if (existingItem) {
    res.send("email is already used ");
  } else {
    const hash = bcrypt.hashSync(data1.password, number);

    const temp = {
      id: data1.id,
      name: data1.name,
      email: data1.email,
      password: hash,
    };

    const token = jwt.sign({ email: data1.email }, secretkey, {
      expiresIn: "28 days",
    });

    arr.push(temp);

    res.send({ msg: "user is registered", token: token });
  }
});

app.post("/login", async (req, res) => {
  const data1 = req.body;
  console.log(data1);

  const find = arr.find((item) => item.email === data1.email);
  if (!find) {
    return res.send("User not registered");
  }

  const validate = await bcrypt.compare(data1.password, find.password);

  if (!validate) {
    return res.send("User password is wrong");
  }

  const token = jwt.sign({ email: data1.email }, secretkey, {
    expiresIn: "28 days",
  });
  res.send({ msg: "User is login ", token: token });
});

app.get("/dashboard", userauth, (req, res) => {
  res.send([
    {
      article: "random article",
    },
  ]);
});

app.listen(port, () => {
  console.log("the port number is " + port);
});
