const Product = require("../models/product")

module.exports.getProducts = () => {
    return Product.find({}).then(result => {
        return result;
    })
}

module.exports.getSpecific = (productId) => {
    //findById() is 
    return Product.findById(productId).then(result => {
        return result;
    })
}

module.exports.addProduct = (body) => {

    let newProduct = new Product ({
         
        name: body.name,
        description: body.description,
        price: body.price

    })


    return newProduct.save().then((product, error) =>{
        if(error){
            return false;
        }else{
            return true;
        }
    })

}

module.exports.updateProduct = (productId, body) => {
    let updatedProduct = {
        name: body.name,
        description: body.description,
        price: body.price
    }

    return Product.findByIdAndUpdate(productId, updatedProduct).then((product, error) => {
        if(error){
            return false;
        }else{
            return true;
        }
    })
}

module.exports.archiveProduct = (productId) => {
	let updatedProduct = {
		isActive: false
	}


	return Product.findByIdAndUpdate(productId, updatedProduct).then((product, error) => {
		if(error){
			return false;
		}else{
			return true;
		}
	})
}

module.exports.toggleArchive = (productId, body) => {
	let updatedProduct = {
		isActive: body.isActive
	}

	return Product.findByIdAndUpdate(productId, updatedProduct).then((product, error) => {
		if(error){
			return false;
		}else{
			return true;
		}
	})
}