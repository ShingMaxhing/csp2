const User = require("../models/user")
const bcrypt = require ("bcryptjs")
const auth = require("../auth")//auth.js file
const user = require("../models/user")
const product = require("../models/product")
//bcrypt


module.exports.checkEmail = (body) => {
    //The mongoDB find() method ALWAYS return an array 
    return User.find({email: body.email}).then(result => {
        if(result.length > 0){//if a duplicate email is found, result.length is 1. Otherwise it is 0
            return true; //true means "yes, email exists"
        } else {
            return false;
        }
    })
}

module.exports.register = (body) => {

    return User.find({isActive:true}).then(result => {
        return result;
    })
}

module.exports.register = (body) => {

    let newUser = new User ({
         
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        //bcrypt's hashSync method is quickest sol. to securely encrypting our users' passwords, so instead of directly passing the password, run it through hashSync first

        //The no. 10 that we are also passing as an argument is called the "salt value".
        //The salt value is the no. of types bcrypt will run its encryption algorithm on a user's password. 10 is enough times to have a speedy process and create a secure password. Any more than 10 simply gives diminishing
        mobileNo: body.mobileNo

    })

    return newUser.save().then((user, error) => {
        if(error){
            return false;
        }else{
            return true;
        }
    })
}



module.exports.login = (body) => {
    //findOne is a special Mongoose method that works like find() except only finds one record and returns an object, not an array

    return User.findOne({email: body.email}).then(result => {
        if (result === null){ //user does not exist in db
            return false;
        } else {
             //bcrypt's compareSync method is the only way to check if the password being submitted by the user is logging in id the same as their encrypted password in our db

            //if the passwords match, compareSync will return true. If not, it returns false

            const isPasswordCorrect = bcrypt.compareSync(body.password, result.password)

            if(isPasswordCorrect){
                return {accessToken: auth.createAccessToken(result.toObject())}
                
            } else {
                return false //passwords don't match
            }
            }
    })
}


module.exports.getProfile = (userId) =>{
    return User.findById(userId).then(result => {
        result.password = undefined //reassign the value of the users' password to undefined, 
        return result
    })
}

module.exports.enroll = async (userId, body) => {
    //parts of an async funtion can be given the await keyword.
    //any statement that is assigned the await keyword must first completely resolve before the function move on to any statementswithout an await keyword.
    //in this function, saving our new user record AND our new curse record must both be resolved before the function can return anything



    //save the changes to the user's data, then check for errors. If there is an error saving, userSaveStatus' value will be false
    let userSaveStatus = await User.findById(userId).then(user => {
        user.enrollments.push({productId: body.productId})
        return user.save().then((user, error) => {
            //if there is no error, userSaveStatus' value will be true
            if (error){
                return false;
            }else{
                return true;
            }
        })
    })

    //the below process is almost exactly the same as above
    let productSaveStatus = await product.findById(body.productId).then(product => {
        product.enrollees.push({userId: userId})

        return product.save().then((product, error) => {
            if(error){
                return false;
            }else{
                return true;
            }
        })
    })

    if(userSaveStatus && productSaveStatus){
        return true;
    }else {
        return false;
    }
}


