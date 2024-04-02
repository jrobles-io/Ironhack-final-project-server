const { model, Schema } = require("mongoose");

const cartSchema = new Schema(
    {
      owner: { type: Schema.Types.ObjectId, ref: 'User' },
    //   date: { type: Date, required: true },
      tickets: [
        {
          ticket: { type: Schema.Types.ObjectId, ref: 'Ticket' },
          quantity: Number,
        }
      ],
      checkOut: {type: Boolean, default: false}
    },
    {
      timestamps: true,
    }
  );

  module.exports = model("Cart", cartSchema);

