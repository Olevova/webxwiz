const { Schema, model, models } = require('mongoose');


const UserSchema = new Schema(
    {
        username: {
            type: String,
        unique: true,      
    },
        password: {
            type: String,
            required: [true, 'Set password for user'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
    },
    {versionKey:false}
);
const User =  model("User", UserSchema)
module.exports = User;
