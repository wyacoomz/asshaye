const Blog = require("../../Module/BlogModule"); // Adjust path as needed
const BlogSEO = require("../../Module/SEO/blog");


// ✅ 1. Create SEO and link with Blog
const createBlogSEO = async (req, res) => {
  try {
    const { title, description, keywords, blogId } = req.body;

    if (!title || !description || !keywords || !blogId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const seo = await BlogSEO.create({ title, description, keywords });

    blog.seo = seo._id;
    await blog.save();

    return res.status(201).json({
      message: "SEO created and linked with blog successfully",
      seo,
    });
  } catch (error) {
    console.error("Create SEO Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ 2. Get all Blog SEO
const getAllBlogSEOs = async (req, res) => {
  try {
    const seos = await BlogSEO.find().sort({ createdAt: -1 });
    return res.status(200).json(seos);
  } catch (error) {
    console.error("Get All SEO Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ 3. Get Blog SEO by ID
const getBlogSEOById = async (req, res) => {
  try {
    const seo = await BlogSEO.findById(req.params.id);
    if (!seo) {
      return res.status(404).json({ message: "SEO not found" });
    }

    return res.status(200).json(seo);
  } catch (error) {
    console.error("Get SEO By ID Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ 4. Update Blog SEO by ID
const updateBlogSEO = async (req, res) => {
  try {
    const { title, description, keywords } = req.body;
    const seo = await BlogSEO.findById(req.params.id);

    if (!seo) {
      return res.status(404).json({ message: "SEO not found" });
    }

    seo.title = title || seo.title;
    seo.description = description || seo.description;
    seo.keywords = keywords || seo.keywords;

    await seo.save();

    return res.status(200).json({
      message: "SEO updated successfully",
      seo,
    });
  } catch (error) {
    console.error("Update SEO Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ 5. Delete Blog SEO by ID and remove from Blog
const deleteBlogSEO = async (req, res) => {
  try {
    const seo = await BlogSEO.findByIdAndDelete(req.params.id);

    if (!seo) {
      return res.status(404).json({ message: "SEO not found" });
    }

    // Remove reference from Blog(s)
    await Blog.updateMany({ seo: seo._id }, { $unset: { seo: "" } });

    return res
      .status(200)
      .json({ message: "SEO deleted and unlinked from blogs" });
  } catch (error) {
    console.error("Delete SEO Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBlogSEO,
  getAllBlogSEOs,
  getBlogSEOById,
  updateBlogSEO,
  deleteBlogSEO,
};
