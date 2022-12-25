const router = require("express").Router();

const isAuth = require("../middlewares/isAuth");

router.post("/", isAuth, (_, res) => {
  res.clearCookie("mcid");
  return res.json({ status: "SUCCESS", data: null });
});

module.exports = router;
