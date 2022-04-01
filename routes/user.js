const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")
const auth = require("../auth")


//route for checking if an email exists in our database
router.post("/checkEmail", (req, res) =>{
    console.log(req.body)
    userController.checkEmail(req.body).then(resultFromController => res.send(resultFromController))
})


//route for user refistration
router.post("/register", (req, res) => {
    console.log(req.body)
    userController.register(req.body).then(resultFromController => res.send(resultFromController))
})

//route for login
router.post("/login", (req,res) => {
    userController.login(req.body).then(resultFromController => res.send(
        resultFromController
        ))
    })

//route for getting user profile
router.get("/details", auth.verify, (req, res) => {
    const userId = auth.decode(req.headers.authorization).id

    userController.getProfile(userId).then(resultFromController => res.send(
        resultFromController
    ))
})

//route for enrollment
router.post("/enroll", auth.verify, (req, res) => {
    console.log(req.body)
    const userId = auth.decode(req.headers.authorization).id
    //userId is a variable that represents the user's ID property that is stored
    userController.enroll(userId, req.body).then(resultFromController => res.send(resultFromController))
})


module.exports = router;















