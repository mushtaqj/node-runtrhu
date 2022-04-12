const express = require("express");
const {
  blogIndex,
  blogGetById,
  blogDelete,
  blogCreatePost,
  blogCreateGet,
} = require("../controllers/blog-controller");

const router = express.Router();

router.get("/", (req, res) => blogIndex(req, res));
router.get("/create", (req, res) => blogCreateGet(req, res));
router.post("/", (req, res) => blogCreatePost(req, res));
router.get("/:id", (req, res) => blogGetById(req, res));
router.delete("/:id", (req, res) => blogDelete(req, res));

module.exports = router;
