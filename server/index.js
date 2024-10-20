const express = require("express");
const cors = require("cors");
const { connectDb } = require("./connection");
const BlogPost = require("./models/BlogPost");
const app = express();
const port = 5000; // You can also use process.env.PORT for flexibility if deployed

// connect databse
connectDb();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes 1: post data
app.post("/post-blog", async (req, res) => {
  let blog = new BlogPost({
    title: req.body.title,
    description: req.body.description,
  });
  await blog.save();

  res.json({ message: "Blog post save successfully", blog }); // Fixed "WelCome" to "Welcome"
});

// Route 2: Get all blogs
app.get("/get-blogs", async (req, res) => {
  let blogs = await BlogPost.find();
  if (!blogs) {
    res.status(404).json({ message: "No blog found" });
  }
  res.json({ blogs });
});

// Route 3: Get a single blog

app.get("/get-blog/:id", async (req, res) => {
  let blog = await BlogPost.findById(req.params.id);
  if (!blog) {
    res.status(404).json({ message: "No blog found" });
  }
  res.json({ blog });
});

// Route 4: Delete a blog

app.delete("/delete-blog/:id", async (req, res) => {
  let blog = await BlogPost.findByIdAndDelete(req.params.id);
  if (!blog) {
    res.status(404).json({ message: "No blog found" });
  }
  res.status(200).json({ message: "Blog deleted successfully" });
});

// Routes 4: update blog

app.put("/update-blog/:id", async (req, res) => {


  let blog = await BlogPost.findByIdAndUpdate(req.params.id);
  if (!blog) {
    res.status(404).json({ message: "No blog found" });
  }
  if (!req.body.title && !req.body.description) {
    res.status(400).json({ message: "Please provide title and description" });
  } else if (!req.body.title) {
    res.status(400).json({ message: "Please provide title" });
  } else if (!req.body.description) {
    res.status(400).json({ message: "Please provide description" });
  } else {
    blog.title = req.body.title;
    blog.description = req.body.description;
  }
  await blog.save();
  res.json({ message: "Blog updated successfully", blog });
});

// Listen to the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
