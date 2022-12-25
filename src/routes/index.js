const router = require("express").Router();

router.get("/", (_, res) => {
  res.render("pages/index");
});

router.use("/register", require("./register"));
router.use("/login", require("./login"));
router.use("/logout", require("./logout"));
router.use("/home", require("./home"));
router.use("/upload", require("./upload"));
router.use("/file", require("./file"));
router.use("/share", require("./share"));

module.exports = router;
