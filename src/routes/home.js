const router = require("express").Router();

const { getUserModel, getFileModel, getLinkModel } = require("../models/index");
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, async (req, res) => {
  try {
    const user = await getUserModel().findById(req.uid).exec();
    const link = await getLinkModel().findOne({ owner: req.uid }).exec();
    const files = await getFileModel()
      .find({ owner: req.uid })
      .select("name type size")
      .exec();
    return res.render("pages/home", { user, files, link });
  } catch (error) {
    console.error(error);
    return res.json({ status: "ERROR", data: { message: error } });
  }
});

module.exports = router;
