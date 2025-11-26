// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartDisplay();

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartDisplay();
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        cartItems.innerHTML += `
            <div>
                <span>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="changeQuantity('${item.name}', -1)">-</button>
                <button onclick="changeQuantity('${item.name}', 1)">+</button>
            </div>
        `;
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = count;
}

function changeQuantity(name, delta) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
        updateCartDisplay();
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Cart toggle
document.getElementById('cart-toggle').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.toggle('open');
});

document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('open');
});

// Checkout modal
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        document.getElementById('checkout-modal').style.display = 'flex';
    } else {
        alert('Your cart is empty!');
    }
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('checkout-modal').style.display = 'none';
});

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed! (This is a demo - no real order processed.)');
    cart = [];
    updateCartDisplay();
    localStorage.removeItem('cart');
    document.getElementById('checkout-modal').style.display = 'none';
});