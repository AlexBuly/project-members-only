const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();

const getUser = (req, res) => {
    res.render("log-in-form", {title: "Login"})
};

const loginUser = (req, res) => {
    app.use(
        session({
            secret: "cats",
            resave: false,
            saveUninitialized: false,
        })
    );

    app.use(passport.initialize());   // REQUIRED
    app.use(passport.session());   

    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
            const { rows } = await pool.query(
                "SELECT * FROM Users WHERE username = $1",
                [username]
            );
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            // Compare hashed password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
            } catch (err) {
            return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const { rows } = await pool.query(
                "SELECT * FROM users WHERE id = $1",
                [id]
            );
            done(null, rows[0]);
        } catch (err) {
            done(err);
        }
    });

    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    });

    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in",
    })
}

const logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    })
}

module.exports= {
    getUser,
    loginUser,
    logout
}