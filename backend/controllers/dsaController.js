const DSA = require("../models/DSA");

const addTopic = async(req, res) => {
    try {

        const { topic, solved } = req.body;

        const data = await DSA.create({
            userId: req.user.id,
            topic,
            solved
        });

        res.status(201).json(data);
    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addTopic
};