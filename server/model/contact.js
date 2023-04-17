const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require,
            unique: true,
        },
        email: {
            type: String,
            require,
            unique: true,
        },
        phone: {
            type: Number,
            require,
            unique: true,
        },
    },
    {
        timestamps: true
    }
)

const contact = mongoose.model('contact', contactSchema)
module.exports = contact