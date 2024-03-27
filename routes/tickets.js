var express = require("express");
var router = express.Router();

// const Ticket = require("../models/Ticket");
// const Event = require("../models/Event");

const isAuthenticated = require('../middleware/isAuthenticated')
const isAdmin = require('../middleware/isAdmin')

const  {ticketCreate}  = require('../controllers/ticketControllers')


router.post("/", isAuthenticated, isAdmin, ticketCreate);

module.exports = router;
