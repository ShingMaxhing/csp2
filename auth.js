const jwt = require("jsonwebtoken");
const secret = "ProductBookingAPI" //can be any string

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin:user.isAdmin
    }

    return jwt.sign(data, secret, {}) // the empty object can recieve various optional settings,but we do not need any
}



module.exports.verify = (req, res, next) => {
    //get our JSON web token from the request's authorization header
    //When you send your JSON web token in a request, it is always contained  in req.headers.authorization
    let token = req.headers.authorization;

    //if a token is NOT included in the reques, it is undefined (meaning it is present)
    if(typeof token !== 'undefined'){
        // console.log(token)
        token = token.slice(7, token.length)
        //remove the "Bearer " part of the token because we do not need it


        //use jwt's built-in verify method to check if the token was created using our API secret
        return jwt.verify(token, secret, (err, data) => {
            //an error occurs if jwt cannot verify a token, so we return an auth failed message, and the route does NOT continue
            if (err){
                return res.send({auth: "failed"})
            }else{
                next() //next() resolves your middleware and allows your code to continue
            }
        })
    }else{ //if no token was submitted with the request
        return res.send({auth: "failed"})
    }
} 

module.exports.decode = (token) => {
    if(typeof token !== "undefined"){

        token =token.slice(7, token.length)

        return jwt.verify(token, secret, (err, data) => {
            if (err){
                return null //if token cannot be verified, return null
            }else{
                return jwt.decode(token, {complete:true}).payload
                //return the payload from decoding the token, which is an object
            }
        })
    }else{ //if no token, return null
        return null
    }
}