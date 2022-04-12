const Blog = require("../models/blogs");

const blogIndex = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => {
      res.render("index", { title: "Home", blogs });
    })
    .catch((error) => console.error(error));
};

const blogCreateGet = (req, res) =>
  res.render("new-blog", { title: "Create Blog" });

const blogCreatePost = (req, res) => {
  const newBlogPost = new Blog(req.body);

  newBlogPost
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => console.error(err));
};

const blogDelete = (req, res) => {
  const { id } = req.params;

  Blog.findByIdAndDelete(id)
    .then(() => res.json({ redirect: "/blogs" }))
    .catch((error) => console.error(error));
};

const blogGetById = (req, res) => {
  const { id } = req.params;

  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        res.render("blog-details", { title: blog.name, blog });
      } else {
        res.redirect("/404");
      }
    })
    .catch((error) => console.error(error));
};

module.exports = {
  blogIndex,
  blogCreateGet,
  blogCreatePost,
  blogDelete,
  blogGetById,
};
