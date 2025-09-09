import mongoose  from "mongoose";

const userSchema = mongoose.Schema({
    firstName : { type: String, require: true},
    lastName : { type: String, require: true},
    email : { type: String, require: true},
    phoneNumber : { type: Number, require: true},
    password : { type: String, require: true},
    address: {
        addressLine1 : { type: String, require: true},
        addressLine2 : { type: String, require: true},
        city : { type: String, require: true},
        zipCode : { type: String, require: true},
        country : { type: String, require: true},
    },
    role: {type: String, default: 'user'},
})

const userModel = mongoose.model('user', userSchema)
export {userModel}