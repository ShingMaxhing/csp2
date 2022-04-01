//set up dependencies

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")//This allows website to connect to your server
//import routes
const productRoutes = require("./routes/product")
const userRoutes = require("./routes/user")


//add the database connection
mongoose.connect("mongodb+srv://admin:admin@testdatabase1.elvgf.mongodb.net/product_booking?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Database connection confirmation message
mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas."))

//server setup
const app = express()
//middlewear that allows our app to recieve nested JSON data
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//activate cors
app.use(cors())

//add imported routed
app.use("/products", productRoutes)
app.use("/users", userRoutes)


const port = 4000

app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port ${port}`)
})