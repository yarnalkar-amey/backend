const express = require("express");
const app = express();
const port = 3000;

// Set EJS as templating engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page", name: "Amey" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
