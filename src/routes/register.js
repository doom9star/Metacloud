const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { getUserModel, getLinkModel } = require("../models");
const isNotAuth = require("../middlewares/isNotAuth");

router.get("/", isNotAuth, (_, res) => {
  res.render("pages/register");
});

router.post("/", isNotAuth, async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await getUserModel().create({
      name,
      password: await bcrypt.hash(password, 10),
    });
    const link = await getLinkModel().create({
      owner: user._id,
    });

    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("mcid", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return res.json({ status: "SUCCESS", data: { user, link } });
  } catch (error) {
    console.error(error);
    return res.json({ status: "ERROR", data: { message: error.message } });
  }
});

module.exports = router;
