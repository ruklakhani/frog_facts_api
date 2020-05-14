const Fact = require('../models/frog_fact');
const User = require('../models/user');

module.exports = (app) => {
    app.post("/api/fact", (req, res) => {
        if (req.user) {
            var fact = new Fact(req.query);
            fact.author = req.user._id;
            fact.save().then(fact => {
                return User.findById(req.user._id);
            }).then(user => {
                user.facts.unshift(fact);
                user.save();
                res.json({
                    status: 200,
                    currentUser: req.user.username,
                    message: "Your frog fact has been added!"
                });
            }).catch(err => {
                res.json({
                    error: err.name,
                    message: err.message,
                });
            });
        } else {
            res.json({
                status: 401,
                message: "You are not authorized to add a frog fact :(",
            });
        }
    });

    app.get('/api/myfacts', (req, res) => {
        const currentUser = req.user;
        Fact.find({ author: currentUser }, 'fact _id')
        .then(facts => {
            res.json({
                status: 200,
                currentUser: currentUser.username,
                facts: facts
            });
        }).catch(err => {
            res.json({
                error: err.name,
                message: err.message,
            });
        });
    });

    app.delete("/api/fact", function (req, res) {
        const currentUser = req.user;
        const factID = req.query.id;
        Fact.findByIdAndRemove(factID)
        .then(fact => {
            res.json({
                status: 200,
                currentUser: currentUser.username,
                message: "You successfully deleted this post!",
            });
        })
        .catch(err => {
            res.json({
                error: err.name,
                message: "Sorry, I can't find a frog fact with that ID.",
            });
        });
    });

    app.get("/api", function (req, res) {
        const currentUser = req.user;
        Fact.find({}, 'fact').select("-_id")
        .then(facts => {
            res.json({
                status: 200,
                currentUser: currentUser.username,
                facts: facts
            });
        })
        .catch(err => {
            res.json({
                error: err.name,
                message: err.message,
            });
        });
    });

    app.get("/api/random", function (req, res) {
        const currentUser = req.user;
        const random = Math.floor(Math.random() * Fact.count());
        Fact.findOne({}, 'fact').skip(random).select("-_id")
        .then(fact => {
            res.json({
                status: 200,
                currentUser: currentUser.username,
                fact: fact.fact
            });
        })
        .catch(err => {
            res.json({
                error: err.name,
                message: err.message,
            });
        });
    });

    app.put("/api/fact", function (req, res) {
        const currentUser = req.user;
        const factID = req.query.id;
        const newFact = req.query.fact;
        Fact.updateOne({_id: factID}, {fact: newFact})
        .then(fact => {
            res.json({
                status: 200,
                currentUser: currentUser.username,
                message: "You successfully updated this post!",
            });
        })
        .catch(err => {
            res.json({
                error: err.name,
                message: "Sorry, I can't find a frog fact with that ID.",
            });
        });
    });
};