const router = require("express").Router();

const isAuth = require("../middlewares/isAuth");
const { getFileModel, getUserModel } = require("../models");

router.post("/", isAuth, async (req, res) => {
  try {
    const user = await getUserModel().findById(req.uid).exec();
    if (user.size + req.body.filesize > 500)
      return res.json({
        status: "ERROR",
        data: { message: "File Size exceeds the storage limit!" },
      });

    const file = await getFileModel().create({
      name: req.body.filename,
      data: req.body.file,
      type: req.body.filetype,
      size: req.body.filesize,
      owner: req.uid,
    });
    user.size += req.body.filesize;
    await user.save();

    return res.json({ status: "SUCCESS", data: file });
  } catch (error) {
    console.error(error);
    return res.json({ status: "ERROR", data: { message: error.message } });
  }
});

module.exports = router;
