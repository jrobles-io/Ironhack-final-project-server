var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Cart = require("../models/Cart");
const Ticket = require("../models/Ticket");

const isAuthenticated = require('../middleware/isAuthenticated')
const isAdmin = require('../middleware/isAdmin')
 const isOwner = require('../middleware/isOwner')

router.post("/", isAuthenticated, isAdmin, (req, res, next) => {
  const { tickets } = req.body;

  Cart.create({
    owner: req.user._id,
    tickets
  })
    .then((createdCart) => {
      console.log("this is the created Cart ===>", createdCart);
      res.json(createdCart);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/:userId", (req, res, next) => {
  Cart.find()
    .populate({
        path: 'tickets.ticket',
        model: 'Ticket'
    })
    .then((foundCarts) => {
      console.log("Found Cart ===>", foundCarts);
      res.json(foundCarts);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// router.get("/details/:cartId", (req, res, next) => {
//   const { cartId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(cartId)) {
//     res.status(400).json({ message: "Specified id is not valid" });
//     return;
//   }

//   Cart.findById(cartId)
//     .populate("tickets")
//     .then((foundCart) => {
//       console.log("Found Cart ===>", foundCart);
//       res.json(foundCart);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json(err);
//     });
// });

router.put("/update/:cartId", isAuthenticated, isOwner, isAdmin, (req, res, next) => {
  const { cartId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cart.findByIdAndUpdate(cartId, req.body, { new: true })
    .populate("tickets")
    .then((updatedCart) => {
      console.log("Updated Cart ====>", updatedCart);
      res.json(updatedCart);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete("/delete/:cartId", isAuthenticated, isOwner, isAdmin, (req, res, next) => {
  const { cartId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cart.findByIdAndDelete(cartId)
    .then((deletedCart) => {
      console.log("This is our deleted Cart", deletedCart);
      let ticketIds = [...deletedCart.tickets];
      let ticketDeletions = ticketIds.map((ticket) => {
        return Ticket.findByIdAndDelete(tickets);
      });
      Promise.allSettled(ticketDeletions)
        .then((deletedTickets) => {
          console.log("Deleted Tickets ==>");
          res.json({ deletedCart, deletedTickets });
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