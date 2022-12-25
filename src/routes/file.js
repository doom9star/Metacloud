const router = require("express").Router();

const { getFileModel, getUserModel } = require("../models/index");
const isAuth = require("../middlewares/isAuth");

router.get("/:id", isAuth, async (req, res) => {
  try {
    const fid = req.params.id;
    const file = await getFileModel().findById(fid).exec();
    return res.json({ status: "SUCCESS", data: file });
  } catch (error) {
    console.error(error);
    return res.json({ status: "ERROR", data: { message: error } });
  }
});

router.get("/download/:id", isAuth, async (req, res) => {
  try {
    const fid = req.params.id;
    const file = await getFileModel().findById(fid).exec();
    return res.json({ status: "SUCCESS", data: file });
  } catch (error) {
    console.error(error);
    return res.json({ status: "ERROR", data: { message: error } });
  }
});

router.get("/delete/:id", isAuth, async (req, res) => {
  try {
    const fid = req.params.id;
    const file = await getFileModel().findOneAndDelete({ _id: fid }).exec();
    await getUserModel().updateOne(
      { _id: req.uid },
      { $inc: { size: -file.size } }
    );
    return res.json({ status: "SUCCESS", data: { filesize: file.size } });
  } catch (error) {
    console.error(error);
    return res.json({ status: "ERROR", data: { message: error } });
  }
});

module.exports = router;
