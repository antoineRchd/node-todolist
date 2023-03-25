const mongoose = require('mongoose')

const { Schema } = mongoose

const toDoListSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

const toDoList = mongoose.model('toDoList', toDoListSchema)

module.exports = toDoList
