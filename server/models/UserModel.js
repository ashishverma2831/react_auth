const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    OTP_VerificationToken:{
        OTP: String,
        expires: Date,
    },
    verificationToken:{
        token: String,
        expires: Date,
    },
})

const UserModel = model("User", userSchema);
module.exports = UserModel;