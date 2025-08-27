// This file contains the JavaScript code for the virtual store.

const products = [
    { id: 1, name: "Product 1", price: 10.00, image: "images/product1.jpg" },
    { id: 2, name: "Product 2", price: 15.00, image: "images/product2.jpg" },
    { id: 3, name: "Product 3", price: 20.00, image: "images/product3.jpg" },
    { id: 4, name: "Product 4", price: 25.00, image: "images/product4.jpg" },
    { id: 5, name: "Product 5", price: 30.00, image: "images/product5.jpg" },
    { id: 6, name: "Product 6", price: 35.00, image: "images/product6.jpg" },
    { id: 7, name: "Product 7", price: 40.00, image: "images/product7.jpg" },
    { id: 8, name: "Product 8", price: 45.00, image: "images/product8.jpg" },
];

let cart = [];

function displayProducts() {
    const productContainer = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    alert(`${product.name} has been added to your cart.`);
}

function viewCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price.toFixed(2)}</p>
        `;
        cartContainer.appendChild(cartItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});