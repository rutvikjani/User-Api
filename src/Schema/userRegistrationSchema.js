const mongoose = require("mongoose")
const Validator = require("validator")
const bcrypt = require("bcrypt")

const userRegistrationSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
        trim: true,
        minlength: 2
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    age:{
        type: Number,
        required: true,
        minlength: 1, 
    },
    email: {
        type: String,
        required: true,
    }, 
    username: {
        type: String,
        required: true,
        lowercase: true,
        Validate(val){
            if(!Validator.isEmail(val)){
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        Validate(val){
            if(val < 5){
                throw new Error("Please Enter a Strong Password")
            }
        }
    },
    mobile: {
        type: Number,
        required: true,
        Validator(val){
            if(val > 10){
                throw new Error("Enter a Valid Number")
            }
        },
        minlength: 10,
    },
    gender:{
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },

})

userRegistrationSchema.pre("save", async function(next){
        this.password = await bcrypt.hash(this.password, 10)
        // console.log("Your encrypted password is :: ",this.password)

    next()
})

module.exports = userRegistrationSchema