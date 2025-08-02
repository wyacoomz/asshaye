const mongoose = require("mongoose");

const SucessSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
      },
    ],
    StudentName: {
      type: String,
    },

    Judicial: {
      type: String,
    },

    altText: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Success", SucessSchema);
