const User = require('../models/User')

const isAdmin = (req, res, next) => {

    User.findById(req.user._id)
        .then((foundUser) => {
            if (foundUser.type.toString() === 'ADMIN') {
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

module.exports = isAdmin