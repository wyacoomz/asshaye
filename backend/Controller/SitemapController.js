const Course = require("../Module/Coursemodule");
const Blog = require("../Module/BlogModule");

const generateSitemap = async (req, res) => {
  const baseUrl = process.env.SITE_URL || "https://aashayeinjudiciary.com";

  const staticUrls = [
    { loc: `${baseUrl}/`, changefreq: "daily", priority: "1.0" },
    { loc: `${baseUrl}/about`, changefreq: "monthly", priority: "0.8" },
    {
      loc: `${baseUrl}/about-institue`,
      changefreq: "monthly",
      priority: "0.8",
    },
    { loc: `${baseUrl}/about-why`, changefreq: "monthly", priority: "0.8" },
    {
      loc: `${baseUrl}/about-Director`,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/success-stories`,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/online-classes`,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/judicial-services`,
      changefreq: "monthly",
      priority: "0.8",
    },
    { loc: `${baseUrl}/event`, changefreq: "monthly", priority: "0.8" },
    {
      loc: `${baseUrl}/team-members`,
      changefreq: "monthly",
      priority: "0.8",
    },
    { loc: `${baseUrl}/faqs`, changefreq: "monthly", priority: "0.8" },
    { loc: `${baseUrl}/blog`, changefreq: "weekly", priority: "0.9" },
    { loc: `${baseUrl}/contact`, changefreq: "monthly", priority: "0.8" },
    { loc: `${baseUrl}/privacy`, changefreq: "monthly", priority: "0.8" },
    // Add other static URLs here
  ];

  try {
    const courses = await Course.find({}, "URL updatedAt createdAt").exec();
    const blogs = await Blog.find({}, "URL updatedAt createdAt").exec();

    const dynamicUrls = [
      ...courses.map((course) => {
        const lastmod = course.updatedAt || course.createdAt;
        return {
          loc: `${baseUrl}/course-details/${course.URL}`,
          lastmod: lastmod ? lastmod.toISOString().split("T")[0] : null,
          changefreq: "weekly",
          priority: "0.9",
        };
      }),
      ...blogs.map((blog) => {
        const lastmod = blog.updatedAt || blog.createdAt;
        return {
          loc: `${baseUrl}/blog-details/${blog.URL}`,
          lastmod: lastmod ? lastmod.toISOString().split("T")[0] : null,
          changefreq: "weekly",
          priority: "0.9",
        };
      }),
    ];

    const allUrls = [...staticUrls, ...dynamicUrls];

    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allUrls
          .map(
            (url) => `
          <url>
            <loc>${url.loc}</loc>
            ${
              url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""
            }
            <changefreq>${url.changefreq}</changefreq>
            <priority>${url.priority}</priority>
          </url>
        `
          )
          .join("")}
      </urlset>
    `;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).send(`Error generating sitemap: ${error.toString()}`);
  }
};

module.exports = {
  generateSitemap,
};
