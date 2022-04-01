const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required."]
    },
    description: {
        type: String,
        required: [true, "Product description is required."]
    },
    price:{
        type: String,
        required: [true, "Price is required."]
    },
    isActive:{
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    enrollees:[{
        userId:{
            type: String,
            required: [true, "User ID is required"]
        },
        enrolledOn: {
            type: Date,
            default: new Date()
        }
    }]
})

//makes our model an exportable module that can be imported into different files
module.exports = mongoose.model("Product", productSchema)