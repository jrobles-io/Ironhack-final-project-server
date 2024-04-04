var express = require("express");
var router = express.Router();

const Ticket = require("../models/Ticket");
// const Event = require("../models/Event");

const isAuthenticated = require('../middleware/isAuthenticated')
const isAdmin = require('../middleware/isAdmin')

const  {ticketCreate}  = require('../controllers/ticketControllers')


router.post("/", isAuthenticated, isAdmin, ticketCreate);

router.put("/:ticketId", isAuthenticated, (req, res, next) => {
    const ticketId = req.params.ticketId;
    const { quantity } = req.body;
  
    // Find the ticket by ID
    Ticket.findById(ticketId)
      .then((ticket) => {
        if (!ticket) {
          return res.status(404).send({ message: "Ticket not found" });
        }
  
        // Subtract the quantity from the ticket's amount
        ticket.amount -= quantity;
  
        // Ensure the amount doesn't go below 0
        ticket.amount = Math.max(0, ticket.amount);
  
        // Save the updated ticket
        return ticket.save();
      })
      .then(updatedTicket => {
        res.json({ message: "Ticket updated successfully", updatedTicket });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ message: "Error updating ticket" });
      });
  });

module.exports = router;
