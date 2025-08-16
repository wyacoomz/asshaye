const express = require("express");
const route = express.Router();
const SitemapController = require("../Controller/SitemapController");

route.get("/sitemap.xml", SitemapController.generateSitemap);

module.exports = route;
