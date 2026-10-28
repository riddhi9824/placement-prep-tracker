const DSA = require("../models/DSA");

const addTopic = async(req, res) => {
    try {

        const { topic, solved, target } = req.body;

        const data = await DSA.create({
            userId: req.user.id,
            topic,
            solved,
            target: target === undefined ? 50 : Number(target)
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

        if (req.body.solved !== undefined) {
            const solved = Number(req.body.solved);

            if (!Number.isInteger(solved) || solved < 0) {
                return res.status(400).json({
                    message: "Problems solved must be a non-negative whole number."
                });
            }

            topic.solved = solved;
        }

        if (req.body.target !== undefined) {
            const target = Number(req.body.target);

            if (!Number.isInteger(target) || target < 1) {
                return res.status(400).json({
                    message: "Target must be a positive whole number."
                });
            }

            topic.target = target;
        }

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