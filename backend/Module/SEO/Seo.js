const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          // Must start with /, no dynamic params like :slug, and only valid characters
          return /^\/[a-zA-Z0-9\-\/]*$/.test(v) && !v.includes(":");
        },
        message: (props) => `${props.value} is not a valid path!`,
      },
    },
    element: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SEO", seoSchema);
