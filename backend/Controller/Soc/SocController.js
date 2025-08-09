const SOC = require("../../Module/Soc/SocModule");

// Create a new SOC link
exports.createSoc = async (req, res) => {
    try {
        const { name, url } = req.body;

        const soc = new SOC({
            name,
            url
        });

        const savedSoc = await soc.save();

        res.status(201).json({
            success: true,
            data: savedSoc,
            message: "SOC link created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get all SOC links
exports.getAllSocs = async (req, res) => {
    try {
        const socs = await SOC.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: socs,
            count: socs.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get single SOC link by ID
exports.getSocById = async (req, res) => {
    try {
        const soc = await SOC.findById(req.params.id);

        if (!soc) {
            return res.status(404).json({
                success: false,
                error: "SOC link not found"
            });
        }

        res.status(200).json({
            success: true,
            data: soc
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update a SOC link
exports.updateSoc = async (req, res) => {
    try {
        const { name, url } = req.body;

        const updatedSoc = await SOC.findByIdAndUpdate(
            req.params.id,
            {
                name,
                url
            },
            { new: true, runValidators: true }
        );

        if (!updatedSoc) {
            return res.status(404).json({
                success: false,
                error: "SOC link not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedSoc,
            message: "SOC link updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Delete a SOC link
exports.deleteSoc = async (req, res) => {
    try {
        const deletedSoc = await SOC.findByIdAndDelete(req.params.id);

        if (!deletedSoc) {
            return res.status(404).json({
                success: false,
                error: "SOC link not found"
            });
        }

        res.status(200).json({
            success: true,
            data: deletedSoc,
            message: "SOC link deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
