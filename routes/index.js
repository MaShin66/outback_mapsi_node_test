const express = require("express");
const router = express.Router();
const path = require("path");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/issue", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/issue.html"));
});

module.exports = router;
