const Application = require("../models/Application");

const addApplication = async(req, res) => {
    try {

        const { company, role, status } = req.body;

        const application = await Application.create({
            company,
            role,
            status,
            user: req.user.id
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getApplications = async(req, res) => {
    try {

        const applications = await Application.find({
            user: req.user.id
        });

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateApplication = async(req, res) => {
    try {

        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }
        if (application.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        application.status = req.body.status;

        await application.save();

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteApplication = async(req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }
        if (application.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await application.deleteOne();

        res.status(200).json({
            message: "Application deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getStats = async(req, res) => {
    try {
        const applications = await Application.find({
            user: req.user.id
        });

        const stats = {
            total: applications.length,
            applied: applications.filter(app => app.status === "Applied").length,
            oa: applications.filter(app => app.status === "OA").length,
            interview: applications.filter(app => app.status === "Interview").length,
            selected: applications.filter(app => app.status === "Selected").length,
            rejected: applications.filter(app => app.status === "Rejected").length
        };

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addApplication,
    getApplications,
    updateApplication,
    deleteApplication,
    getStats
};