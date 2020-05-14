const jwt = require('jsonwebtoken');
const User = require("../models/user");

module.exports = (app) => {
    // SIGN UP POST
    app.post("/api/signup", (req, res) => {
        const username = req.query.username;
        const password = req.query.password;
        // Create User and JWT
        const user = new User({username: username, password: password});
        user.save().then((user) => {
            var token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: "60 days"});
            res.cookie('nToken', token, {maxAge: 900000, httpOnly: true});
            res.json({
                status: 200,
                message: "Your account has been created!"
            });
        }).catch(err => {
            res.json({
                error: err.name,
                message: err.message,
            });
        });
    });
    // LOGIN
    app.post("/api/login", (req, res) => {
        const username = req.query.username;
        const password = req.query.password;
        // Find this user name
        User.findOne({ username }, "username password")
        .then(user => {
            if (!user) {
            // User not found
            return res.json({
                status: 401,
                message: "Wrong Username or Password"
            });
            }
            // Check the password
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch) {
                    // Password does not match
                    return res.json({
                        status: 401,
                        message: "Wrong Username or Password"
                    });
                }
                // Create a token
                const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                    expiresIn: "60 days"
                });
                // Set a cookie and redirect to root
                res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
                res.json({
                    status: 200,
                    message: "You successfully logged in!",
                    user: username
                });
            });
        })
        .catch(err => {
            res.json({
                error: err.name,
                message: err.message,
            });
        });
    });
    // LOGOUT
    app.get('/api/logout', (req, res) => {
        res.clearCookie('nToken');
        res.json({
            status: 200,
            message: "You successfully logged out!"
        });
    });
};
