const express = require("express");
const router = express.Router();



const {
  createBlogSEO,
  getAllBlogSEOs,
  getBlogSEOById,
  updateBlogSEO,
  deleteBlogSEO,
} = require("../../Controller/Seo/blogSeoCtrl");

// Create
router.post("/create", createBlogSEO);

// Read All
router.get("/", getAllBlogSEOs);

// Read One
router.get("/:id", getBlogSEOById);

// Update
router.put("/:id", updateBlogSEO);

// Delete
router.delete("/:id", deleteBlogSEO);

module.exports = router;
