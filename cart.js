var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const cartItemsContainer = document.getElementById('cart-items');

var buyerNameInput = document.getElementById('buyer-name');
var buyerEmailInput = document.getElementById('buyer-email');

function createItemElement(item) {
  const itemElement = document.createElement('div');
  itemElement.classList.add('cartlist');
  console.log(item);
  itemElement.innerHTML = `
      <span><img src="${item.imageUrl}" alt="Product Image"/></span>
      <span>${item.name}</span>
      <span >${item.price}</span>
      <div class="quantity-controls">
        <button class="decrement-btn">-</button>
        <span>${item.quantity}</span>
        <button class="increment-btn">+</button>
      </div>
   `;

  const decrementButton = itemElement.querySelector('.decrement-btn');
  const incrementButton = itemElement.querySelector('.increment-btn');
  const quantitySpan = itemElement.querySelector('.quantity-controls span');

  decrementButton.onclick = function () {
    item.quantity--;
    if (item.quantity <= 0) {
      cartItems = cartItems.filter(cartItem => cartItem !== item);
    } else {
      cartItems = cartItems.map(cartItem => cartItem.name === item.name ? item : cartItem);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
  };

  incrementButton.onclick = function () {
    item.quantity++;
    cartItems = cartItems.map(cartItem => cartItem.name === item.name ? item : cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
  };

  return itemElement;
}

function updateCartDisplay() {
  cartItemsContainer.innerHTML = '';
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `<p style="
    text-align: center;
    color: black;
    font-size: 20px;
">Your cart is empty</p>`;
  } else {
    cartItems.forEach(item => {
      const itemElement = createItemElement(item);
      cartItemsContainer.appendChild(itemElement);
    });
  }
  updateSubtotal();
}

function updateSubtotal() {
  var subtotal = 0;

  cartItems.forEach(function (item) {
    subtotal += item.price * item.quantity;
  });

  var subtotalElement = document.getElementById('subtotal');
  if (cartItems.length === 0) {
    emptyCart()
  } else {
    subtotalElement.innerHTML = 'Subtotal: Rp ' + subtotal.toFixed(2);
  }
}
updateSubtotal();

function emptyCart() {
  localStorage.removeItem('cartItems');
  cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
  var subtotalElement = document.getElementById('subtotal');
  subtotalElement.innerHTML = '';
}

function checkout() {
  var order = {
    buyerName: buyerNameInput.value,
    buyerEmail: buyerEmailInput.value,
    items: cartItems
  };

  localStorage.setItem('order', JSON.stringify(order));
  window.location.href = 'transaction.html';
  emptyCart();
}

cartItems.forEach(function (item) {
  console.log(item)
  const itemElement = createItemElement(item);
  cartItemsContainer.appendChild(itemElement);
});
