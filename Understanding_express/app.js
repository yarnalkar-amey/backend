const express = require("express");

const app = express();

//Routes

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//helpers

const getPath = require("./utils/pathHelper")

//middle that parses the incoming the request
app.use(express.urlencoded({ extended: false })); //no need of separate body parser

//to serve static file 
app.use(express.static(getPath("Understanding_express","public")))

app.use("/admin",adminRoutes);
app.use(shopRoutes);

app.use((req,res,next) => {
    res.status(404).send("<h1>404, Page not found !!!</h1>")
})

app.listen(3000, () => {
  console.log("App is listening on the port 3000 !!!");
});
