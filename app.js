const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const signupRouter = require("./routes/signupRouter");

app.use("/sign-up", signupRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));
