var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

const isAuthenticated = require('../middleware/isAuthenticated')
const isAdmin = require('../middleware/isAdmin')
 const isOwner = require('../middleware/isOwner')

router.post("/", isAuthenticated, isAdmin, (req, res, next) => {
  const { title, description, date  } = req.body;

  Event.create({
    title,
    description,
    date,
    owner: req.user._id
  })
    .then((createdEvent) => {
      console.log("this is the created Event ===>", createdEvent);
      res.json(createdEvent);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/", (req, res, next) => {
  Event.find()
    .populate("tickets")
    .then((foundEvents) => {
      console.log("Found Events ===>", foundEvents);
      res.json(foundEvents);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/details/:eventId", (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findById(eventId)
    .populate("tickets")
    .then((foundEvent) => {
      console.log("Found Event ===>", foundEvent);
      res.json(foundEvent);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.put("/update/:eventId", isAuthenticated, isOwner, isAdmin, (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findByIdAndUpdate(eventId, req.body, { new: true })
    .populate("tickets")
    .then((updatedEvent) => {
      console.log("Updated Event ====>", updatedEvent);
      res.json(updatedEvent);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete("/delete/:eventId", isAuthenticated, isOwner, isAdmin, (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findByIdAndDelete(eventId)
    .then((deletedEvent) => {
      console.log("This is our deleted Event", deletedEvent);
      let ticketIds = [...deletedEvent.tickets];
      let ticketDeletions = ticketIds.map((ticket) => {
        return Ticket.findByIdAndDelete(tickets);
      });
      Promise.allSettled(ticketDeletions)
        .then((deletedTickets) => {
          console.log("Deleted Tickets ==>");
          res.json({ deletedEvent, deletedTickets });
        })
        .catch((err) => {
          console.log(err);
          res.json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});


// router.delete("/delete/:projectId", (req, res, next) => {
//   const { projectId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(projectId)) {
//     res.status(400).json({ message: "Specified id is not valid" });
//     return;
//   }

//   Project.findByIdAndDelete(projectId)
//     .then((deletedProject) => {
//       console.log("This is our deleted project", deletedProject);

//       Task.deleteMany({project: deletedProject._id})
//         .then((deletedTasks) => {
//           console.log("These are the deleted tasks")
//           res.json({ deletedProject, deletedTasks})
//         })
//         .catch((err) => {
//           console.log(err);
//           res.json(err);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json(err);
//     })
    
// });

module.exports = router;