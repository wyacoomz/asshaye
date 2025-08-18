const SEO = require("../../Module/SEO/Seo");

exports.createSEO = async (req, res) => {
  try {
    const { path, element, title, description, keywords } = req.body;
    const seo = new SEO({ path, element, title, description, keywords });
    await seo.save();
    res.status(201).json({ message: "SEO data saved", seo });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Error saving SEO data" });
  }
};

exports.getAllSEO = async (req, res) => {
  try {
    const seoData = await SEO.find();
    res.status(200).json(seoData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching SEO data" });
  }
};

exports.updateSeo = async (req, res) => {
  try {
    const seoId = req.params.id;
    const { path, title, description, keywords } = req.body;

    const updatedSeo = await SEO.findByIdAndUpdate(
      seoId,
      { path, title, description, keywords },
      { new: true, runValidators: true }
    );

    if (!updatedSeo) {
      return res.status(404).json({ error: "SEO record not found" });
    }

    res.status(200).json(updatedSeo);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ error: "Failed to update SEO data", details: err });
  }
};

// Delete SEO by ID
exports.deleteSeo = async (req, res) => {
  try {
    const seoId = req.params.id;
    const deletedSeo = await SEO.findByIdAndDelete(seoId);

    if (!deletedSeo) {
      return res.status(404).json({ error: "SEO record not found" });
    }

    res.status(200).json({ message: "SEO record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete SEO data", details: err });
  }
};
