const { Schema } = require("mongoose");

const user = new Schema(
  {
    name: String,
    password: String,
    size: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = user;
