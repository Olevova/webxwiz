const fs = require('fs');
const path = require('path');
const Product = require('../models/product.js');


const addDate = () => {
  
const jsonFilePath = path.join(__dirname, 'date.json');
const rawData = fs.readFileSync(jsonFilePath, 'utf8');
console.log(jsonFilePath, rawData);
try {
  const productsData = JSON.parse(rawData);

  Product.countDocuments({}).then((count) => {
    if (count === 0) {
      productsData.forEach((productData) => {
        const newProduct = new Product(productData);
        newProduct.save();
        console.log(`Product "${productData.title}" saved to the database.`);
      });
    } else {
      console.log('Products already exist in the database. Skipping data import.');
    }
  });
} catch (error) {
  console.error(`Error parsing JSON file: ${error.message}`);
}
}

module.exports = addDate;