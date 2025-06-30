const fs = require("fs");
const path = require("path");

// Path to cart.json file
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent); // existing cart
      }

      // Check if product already exists
      const existingProductIndex = cart.products.findIndex(p => p.id === id);
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products.push(updatedProduct);
      }

      // Make sure price is treated as a number
      cart.totalPrice += +productPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.error("Error writing cart data:", err);
        }
      });
    });
  }
}

module.exports = Cart;
