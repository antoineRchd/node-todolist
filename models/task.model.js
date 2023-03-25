const mongoose = require('mongoose')

const { Schema } = mongoose

const taskSchema = new Schema({
    shortDescription: {
        type: String,
        required: true,
    },
    longDescription: {
        type: String,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    todo: {
        type: Schema.Types.ObjectId,
        ref: 'Todo',
        required: true,
    },
})

const task = mongoose.model('task', taskSchema)

module.exports = task
