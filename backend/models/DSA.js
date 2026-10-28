const mongoose = require("mongoose");

const dsaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    topic: {
        type: String,
        required: true
    },

    solved: {
        type: Number,
        default: 0,
        min: 0
    },

    target: {
        type: Number,
        required: true,
        default: 50,
        min: 1
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("DSA", dsaSchema);