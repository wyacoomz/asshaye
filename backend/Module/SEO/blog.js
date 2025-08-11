const mongoose = require("mongoose");

const BlogSeoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogSEO", BlogSeoSchema);
