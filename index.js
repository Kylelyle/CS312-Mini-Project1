import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const wallposts = [];
let editindex = NaN;
var date = new Date();
app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Opened on port: ${port}.`)
})

app.get("/", (req, res) => {
    res.render("index.ejs", { wallposts: wallposts });
})

app.post("/postblog", (req, res) => {
    var date = new Date();
    wallposts.push({ name: req.body["username"], date: date.toLocaleString(), title: req.body["title"], blogpost: req.body["post"] });

    res.redirect("/");

})

app.get("/edit", (req, res) => {
    res.render("edit.ejs", { editindex: editindex, wallposts: wallposts });
})

app.post("/edit", (req, res) => {
    editindex = req.body["editbutton"]

    res.redirect("/edit")
})
app.post("/editblog", (req, res) => {
    wallposts[editindex] = { name: req.body["username"], date: wallposts[editindex].date, title: req.body["title"] + " (Edited)", blogpost: req.body["post"] };

    res.redirect("/");
})

app.post("/deleteblog", (req, res) => {
    wallposts.splice(req.body["delbutton"], 1);
    res.redirect("/");
})