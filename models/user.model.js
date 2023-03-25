const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    TodoList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'TodoList',
        },
    ],
})

const User = mongoose.model('User', userSchema)

module.exports = User
