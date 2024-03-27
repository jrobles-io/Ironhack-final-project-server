const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
