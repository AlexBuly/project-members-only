const express = require("express");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const pool = require("./db/pool");
const bcrypt = require("bcryptjs");
const app = express();
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const indexRouter = require("./routes/indexRouter");
const loginController = require("./controllers/loginController");
const messagesRouter = require("./routes/messagesRouter");
const membershipRouter = require("./routes/membershipRouter");
const adminRouter = require("./routes/adminRouter");

app.use(
    session({
        secret: "cats",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM Users WHERE username = $1", [username]);
            const user = rows[0];

            if (!user) return done(null, false, { message: "Incorrect username" });

            const match = await bcrypt.compare(password, user.password);
            if (!match) return done(null, false, { message: "Incorrect password" });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM Users WHERE id = $1", [id]);
        done(null, rows[0]);
    } catch (err) {
        done(err);
    }
});

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use("/sign-up", signupRouter);
app.use("/login", loginRouter);
app.use("/", indexRouter);
app.use("/new", messagesRouter);
app.get("/log-out", loginController.logout);
app.use("/join", membershipRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));
