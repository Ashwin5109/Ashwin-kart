let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add product to cart
function addToCart(product) {
    let existing = cart.find(item => item.name === product.name);
    if(existing){
        existing.qty += 1;
    } else {
        product.qty = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart! Total items: ${cart.reduce((a,b)=>a+b.qty,0)}`);
}

// Load Cart Page
function loadCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total-price');
    cartContainer.innerHTML = '';
    let total = 0;

    if(cart.length === 0){
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.qty;
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.marginBottom = '10px';
            div.innerHTML = `
                <img src="${item.img}" style="width:50px; height:50px; object-fit:cover; margin-right:10px;">
                <p style="flex:1;">${item.name} - ₹${item.price}</p>
                <button onclick="decreaseQty(${index})">-</button>
                <span style="margin:0 5px;">${item.qty}</span>
                <button onclick="increaseQty(${index})">+</button>
                <button onclick="removeItem(${index})" style="margin-left:10px;">Remove</button>
            `;
            cartContainer.appendChild(div);
        });
    }
    totalContainer.textContent = `Total: ₹${total}`;
}

// Cart item operations
function increaseQty(index){ cart[index].qty +=1; updateCart();}
function decreaseQty(index){ if(cart[index].qty>1){cart[index].qty-=1}else{cart.splice(index,1);} updateCart();}
function removeItem(index){ cart.splice(index,1); updateCart();}
function updateCart(){ localStorage.setItem('cart', JSON.stringify(cart)); loadCart(); }

// Load product details dynamically
function loadProduct(){
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const price = params.get('price');
    const img = params.get('img');

    document.getElementById('product-img').src = img;
    document.getElementById('product-name').textContent = name;
    document.getElementById('product-price').textContent = `Price: ₹${price}`;
    document.getElementById('add-btn').onclick = function(){ addToCart({name, price: parseInt(price), img}) };
}
