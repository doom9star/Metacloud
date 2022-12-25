const router = require("express").Router();

const { getLinkModel, getUserModel, getFileModel } = require("../models/index");
const isAuth = require("../middlewares/isAuth");

router.post("/save", isAuth, async (req, res) => {
  try {
    const { secure, password } = req.body;
    const link = await getLinkModel().findOne({ owner: req.uid }).exec();
    if (secure) {
      link.secure = true;
      link.password = password;
    } else {
      link.secure = false;
      link.password = "";
    }
    await link.save();
    return res.json({ status: "SUCCESS", data: null });
  } catch (error) {
    console.error(error);
    return res.json({ status: "ERROR", data: { message: error } });
  }
});

router.get("/:id", isAuth, async (req, res) => {
  try {
    const lid = req.params.id;
    const link = await getLinkModel().findById(lid).exec();
    const owner = await getUserModel().findById(link.owner).exec();
    const files = await getFileModel().find({ owner: owner._id }).exec();
    return res.render("pages/share", { link, owner, files });
  } catch (error) {
    console.error(error);
    return res.json({ status: "ERROR", data: { message: error } });
  }
});

router.post("/unlock", async (req, res) => {
  try {
    const { password, lid } = req.body;
    const link = await getLinkModel().findById(lid).exec();
    if (link.password !== password) throw new Error("Wrong password!");
    return res.json({ status: "SUCCESS", data: null });
  } catch (error) {
    console.error(error);
    return res.json({ status: "ERROR", data: { message: error } });
  }
});

module.exports = router;
