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

const getTopics = async(req, res) => {
    try {
        const topics = await DSA.find({
            userId: req.user.id
        });

        res.status(200).json(topics);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateTopic = async(req, res) => {
    try {
        const topic = await DSA.findById(req.params.id);

        if (!topic) {
            return res.status(404).json({
                message: "Topic not found."
            });
        }

        if (topic.userId.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        topic.solved = req.body.solved;

        await topic.save();

        res.status(200).json(topic);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteTopic = async(req, res) => {
    try {
        const topic = await DSA.findById(req.params.id);

        if (!topic) {
            return res.status(404).json({
                message: "Topic not found"
            });
        }

        if (topic.userId.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not authorized"
            })
        }

        await topic.deleteOne();

        res.status(200).json({
            message: "Topic deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addTopic,
    getTopics,
    updateTopic,
    deleteTopic
};