const express = require("express");
const router = express.Router();
const socController = require("../../Controller/Soc/SocController");

// Create a new soc link
router.post("/", socController.createSoc);

// Get all soc links
router.get("/", socController.getAllSocs);

// Get single soc link
router.get("/:id", socController.getSocById);

// Update a soc link
router.put("/:id", socController.updateSoc);

// Delete a soc link
router.delete("/:id", socController.deleteSoc);

module.exports = router;
