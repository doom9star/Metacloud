const { Schema, SchemaTypes } = require("mongoose");

const link = new Schema(
  {
    owner: { type: SchemaTypes.ObjectId, ref: "users" },
    secure: { type: Boolean, default: false },
    password: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = link;
