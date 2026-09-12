const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Applied"
    },

    appliedDate: {
        type: Date,
        default: Date.now
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

});

module.exports = mongoose.model("Application", applicationSchema);