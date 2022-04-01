const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: [true, "First name is required"]
    },
    lastName:{
        type:String,
        required: [true, "Last name is required"]
    },
    email: {
        type:String,
        required: [true, "Email is required"]
    },
    password: {
        type:String,
        required: [true, "Password required"]
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
    mobileNo :{
        type: String,
        required: [true, "Mobile number is required"]
    },
    enrollments: [{
        productId: {
            type: String,
            required: [true, "Product ID is required"]
        },
        enrolledOn: {
        type: Date,
        default: new Date()
        },
        status: {
            type: String,
            default: "Enrolled" //other user enrollment status are:"Cancelled and Completed"
        }
    }]
}
)

module.exports = mongoose.model("User", userSchema)