const Ticket = require("../models/Ticket");
const Event = require('../models/Event')

const ticketCreate = (req, res, next) => {
  const { title, description, type, eventId, amount, price } = req.body;
  console.log(req.body);
  Ticket.create({
    title,
    type,
    description,
    event: eventId,
    amount,
    price
  })
    .then((createdTicket) => {
      console.log("Event ====>", Event);
      return Event.findByIdAndUpdate(
        createdTicket.event,
        {
          $push: { tickets: createdTicket._id },
        },
        {
          new: true,
        }
      );
    })
    .then((eventToPopulate) => {
      return eventToPopulate.populate("tickets");
    })
    .then((populatedEvent) => {
      console.log("Populated Event with new ticket ====>", populatedEvent);
      res.json(populatedEvent);
    })
    .catch((err) => {
      console.log("Error creating ticket", err);
      res.json({ errorMessage: "Error creating ticket", err });
    });
};

module.exports = {
  ticketCreate,
};