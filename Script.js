// Shared product data
const products = [
    {id:1, name:"Smartphone", price:150, category:"Electronics", image:"https://via.placeholder.com/200", description:"High-quality smartphone."},
    {id:2, name:"Laptop", price:500, category:"Electronics", image:"https://via.placeholder.com/200", description:"Powerful laptop."},
    {id:3, name:"T-Shirt", price:20, category:"Clothing", image:"https://via.placeholder.com/200", description:"Comfortable cotton t-shirt."},
    {id:4, name:"Jeans", price:35, category:"Clothing", image:"https://via.placeholder.com/200", description:"Stylish denim jeans."},
    {id:5, name:"Coffee Maker", price:40, category:"Home", image:"https://via.placeholder.com/200", description:"Brew coffee easily."},
    {id:6, name:"Vacuum Cleaner", price:80, category:"Home", image:"https://via.placeholder.com/200", description:"Keep home clean."}
];

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add product to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    saveCart();
    alert("Added to cart!");
}

// Show product detail
function showDetail(id) {
    localStorage.setItem('detailId', id);
    window.location.href = "product.html";
}

// Display products on a page
function displayProducts(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    if (items.length === 0) {
        container.innerHTML = "<p class='col-span-full text-center'>No products found.</p>";
        return;
    }
    items.forEach(p => {
        const div = document.createElement("div");
        div.className = "bg-white border rounded-lg shadow p-4 flex flex-col items-center";
        div.innerHTML = `
            <img src="${p.image}" alt="${p.name}" class="mb-2 rounded cursor-pointer" onclick="showDetail(${p.id})">
            <h3 class="font-semibold text-lg">${p.name}</h3>
            <p class="text-blue-600 font-bold">$${p.price}</p>
            <button class="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
                    onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        container.appendChild(div);
    });
}

// Filter products
function filterProducts(searchId, categoryId, priceId, containerId) {
    const search = document.getElementById(searchId).value.toLowerCase();
    const category = document.getElementById(categoryId).value;
    const priceRange = document.getElementById(priceId).value;
    let filtered = products.filter(p => p.name.toLowerCase().includes(search));
    if (category !== "All") filtered = filtered.filter(p => p.category === category);
    if (priceRange !== "All") {
        const [min, max] = priceRange.split("-").map(Number);
        filtered = filtered.filter(p => p.price >= min && p.price <= (max || Infinity));
    }
    displayProducts(filtered, containerId);
}

// Render cart page
function renderCart(cartItemsId, totalId) {
    const cartItems = document.getElementById(cartItemsId);
    const totalEl = document.getElementById(totalId);
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = "<li>Your cart is empty</li>";
        totalEl.innerText = 0;
        return;
    }
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "flex justify-between mb-1";
        li.innerHTML = `${item.name} - $${item.price} <button class="text-red-600" onclick="removeFromCart(${index}, '${cartItemsId}', '${totalId}')">X</button>`;
        cartItems.appendChild(li);
    });
    totalEl.innerText = cart.reduce((sum, item) => sum + item.price, 0);
}

// Remove item from cart
function removeFromCart(index, cartItemsId, totalId) {
    cart.splice(index, 1);
    saveCart();
    renderCart(cartItemsId, totalId);
}

// Checkout
function checkout(cartItemsId, totalId) {
    if (cart.length === 0) { alert("Cart empty!"); return; }
    alert(`Thank you! Total: $${cart.reduce((sum,item)=>sum+item.price,0)}`);
    cart = [];
    saveCart();
    renderCart(cartItemsId, totalId);
}
