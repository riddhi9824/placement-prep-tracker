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
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("DSA", dsaSchema);