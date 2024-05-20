var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

var cartItemsContainer = document.getElementById('cart-items');
var buyerNameInput = document.getElementById('buyer-name');
var buyerEmailInput = document.getElementById('buyer-email');

function createItemElement(item) {
  const itemElement = document.createElement('div');
  itemElement.classList.add('cartlist');
  itemElement.innerHTML = "<span class='item-detail'><span>" + item.name + "</span>  <span>" + item.price + "</span></span>";

  const decreaseQuantityButton = document.createElement('button');
  const increaseQuantityButton = document.createElement('button');
  decreaseQuantityButton.textContent = '-';
  increaseQuantityButton.textContent = '+';
  const itemquantity = document.createElement('span');
  itemquantity.classList.add('item-quantity');
  itemquantity.appendChild(decreaseQuantityButton);
const quantityText = document.createTextNode(item.quantity);
itemquantity.appendChild(quantityText);
itemquantity.appendChild(increaseQuantityButton);
  decreaseQuantityButton.onclick = function () {
    item.quantity--;
    cartItems = cartItems.map(cartItem => cartItem.name === item.name ? item : cartItem);
    if (item.quantity <= 0) {
      cartItems = cartItems.filter(cartItem => cartItem !== item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
  };

  increaseQuantityButton.onclick = function () {
    item.quantity++;
    cartItems = cartItems.map(cartItem => cartItem.name === item.name ? item : cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
  };

  itemElement.appendChild(itemquantity);


  return itemElement;
}

function updateCartDisplay() {
  cartItemsContainer.innerHTML = '';
  cartItems.forEach(item => {
    const itemElement = createItemElement(item);
    cartItemsContainer.appendChild(itemElement);
  });
  updateSubtotal();
}

updateCartDisplay();

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
  cartItemsContainer.innerHTML = '';
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

