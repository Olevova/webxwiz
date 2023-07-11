const Product = require('../../models/product.js');

const allProducts = async (req, res, next) => {
    try {
        const product = await Product.find();
        // console.log(product);
        return res.json(product)
    } catch (error) {
         console.log(error.message);
    }
}


module.exports = {
allProducts   
}