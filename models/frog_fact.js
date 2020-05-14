// models/frog_fact.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FactSchema = new Schema({
    fact: { type: String, required: true },
    author : { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Fact", FactSchema);