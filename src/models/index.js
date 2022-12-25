const mongoose = require("mongoose");
const UserSchema = require("./schemas/user");
const FileSchema = require("./schemas/file");
const LinkSchema = require("./schemas/link");

var UserModel = undefined;
var FileModel = undefined;
var LinkModel = undefined;

const getUserModel = () => {
  return UserModel;
};
const getFileModel = () => {
  return FileModel;
};

const getLinkModel = () => {
  return LinkModel;
};

const connectDB = async () => {
  return new Promise((res, rej) =>
    mongoose
      .connect(process.env.MONGO, { dbName: "metacloud" })
      .then(() => {
        UserModel = mongoose.model("users", UserSchema);
        FileModel = mongoose.model("files", FileSchema);
        LinkModel = mongoose.model("links", LinkSchema);
        console.log("\nmongo-atlas connected successfully!");
        res();
      })
      .catch((err) => rej(err))
  );
};

module.exports = {
  connectDB,
  getUserModel,
  getFileModel,
  getLinkModel,
};
