const Event = require('../models/Event')

const isOwner = (req, res, next) => {

    const { eventId } = req.params;

    Event.findById(eventId)
        .then((foundEvent) => {
            if (foundEvent.owner.toString() === req.user._id) {
                next()
            } else {
                res.status(402).json({message: "Not authorized"})
            }
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })

}

module.exports = isOwner