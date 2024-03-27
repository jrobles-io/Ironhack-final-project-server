const { model, Schema } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {type: String, required: true},
    // category: {type: String, enum: ['Concert', 'Party', 'Private Event']},
    description: String,
    date: {type: Date, required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    tickets: [{type: Schema.Types.ObjectId, ref: 'Ticket'}],
    soldOut: {type: Boolean, default: false}

  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", eventSchema);