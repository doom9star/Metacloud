const { SchemaTypes, Schema } = require("mongoose");

const file = new Schema(
  {
    name: String,
    data: String,
    type: String,
    size: SchemaTypes.Number,
    owner: { type: SchemaTypes.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

module.exports = file;
