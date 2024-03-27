const { model, Schema } = require("mongoose");

const ticketSchema = new Schema(
  {
    title: {type: String, required: true},
    type: {type: String, required: true, enum:['General', 'VIP', 'Backstage', 'Complimentary']},
    description: String,
    event: {type: Schema.Types.ObjectId, ref: 'Event'},
    amount: Number,
    price: Number   //Price will be set in cents and will be converted to dollars in the frontend
  },
  {
    timestamps: true,
  }
);

module.exports = model("Ticket", ticketSchema);