var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Cart = require("../models/Cart");
// const Ticket = require("../models/Ticket");

const isAuthenticated = require('../middleware/isAuthenticated')
 const isOwner = require('../middleware/isOwner')

router.post("/", isAuthenticated, (req, res, next) => {
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

router.get("/", isAuthenticated, (req, res, next) => {
  Cart.find({owner: req.user._id})
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


router.put("/update", isAuthenticated, (req, res, next) => {

  Cart.findOneAndUpdate({owner: req.user._id}, req.body, { new: true })
    .populate({
        path: 'tickets.ticket',
        model: 'Ticket'
    })
    .then((updatedCart) => {
      console.log("Updated Cart ====>", updatedCart);
      res.json(updatedCart);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;