//setup the dependencies
const express = require("express");
const router = express.Router();

//import the controller file
const productController = require("../controllers/product");
const auth = require("../auth");

//route to get all active products
router.get("/", (req, res)=>{
    productController.getProducts().then(resultFromController => res.send(resultFromController))
})

//route to get specific product
router.get("/:productId", (req, res) => {

    //"/:productId" here is called a "wildcard" and its value is anything that is added at the end of localhost:4000/courses

    //eg. localhost:4000/products/dog = the value of our wildcard is "dog"

    // console.log(req.params)

    //req.params always given an object. The key for this object is our wildcard, and the value comes from the request 

    productController.getSpecific(req.params.productId).then(resultFromController => res.send(resultFromController))

})

//route to create a new product

//when a user sends a specific method to a specific endpoint (in this case a POST req to our /products endpoint) the code within this route will be run
router.post("/", auth.verify, (req,res) => {
    //auth.verify here is something called "middleware". "Middleware" is any function must first be resolved before any succeeding code will be executed.

    //show in the console the req body
    // console.log(req.body)

    //invoke the addProduct method contained in the productController module, which is an object. Pages, when imported via Node are treated as objects.

    //We also pass the req.body to addProduct as part of the data that it needs

    //Once addProduct has resolved,. then can send whatever it returns (true or false) as its response

    if(auth.decode(req.headers.authorization).isAdmin){
            productController.addProduct(req.body).then(resultFromController => res.send(resultFromController))
    }else{
        res.send(false)
    }
})

//route to update a single product
router.put("/:productId", auth.verify, (req, res) => {
    console.log(req.body)
	if(auth.decode(req.headers.authorization).isAdmin){
		productController.updateProduct(req.params.productId, req.body).then(resultFromController => res.send(resultFromController))
	}else{
		res.send(false)
	}
})


router.put("/:productId/archive", auth.verify, (req, res) => {
	if(auth.decode(req.headers.authorization).isAdmin){
		productController.toggleArchive(req.params.productId, req.body).then(resultFromController => res.send(resultFromController))
	}else{
		res.send(false)
	}
})



//export the router
module.exports = router;


// firstName: 'Cream',
// lastName: 'Milk',
// email: 'creammilk@mail.com',
// mobileNo: '12345678999',
// password: '123'
