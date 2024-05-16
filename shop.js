// Add to Wishlist

function addToWishlist(name, price) {
  var wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

  var existingItem = wishlistItems.find(function(item) {
    return item.name === name;
  });

  if (existingItem) {
    return;
  }

  var newItem = { 
    name: name,
    price: price, 
  };

  wishlistItems.push(newItem);

  localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

  updateDropdownWishlist(wishlistItems);

  alert('Item added to wishlist successfully!');
}

function updateDropdownWishlist(items) {
  var dropdownContent = document.getElementById('wishlistDropdownContent');
  dropdownContent.innerHTML = ''; 

  items.forEach(function(item) {
    var listItem = document.createElement('div');
    listItem.classList.add('wishlist-item');

    var itemName = document.createElement('span');
    itemName.textContent = '🌱 ' + item.name + ' - ₹' + item.price;
    itemName.classList.add('item-name');
    listItem.appendChild(itemName);

    var addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('add-to-cart-button');
    addToCartButton.addEventListener('click', function() {
      addToCart(item.name, item.price);
    });
    listItem.appendChild(addToCartButton);

    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', function() {
      removeFromWishlist(item.name);
    });
    listItem.appendChild(removeButton);

    dropdownContent.appendChild(listItem);
  });

  var viewWishlistLink = document.createElement('a');
  viewWishlistLink.textContent = 'View Wishlist';
  viewWishlistLink.href = 'wishlist.html'; 
  viewWishlistLink.classList.add('view-wishlist-link');
  dropdownContent.appendChild(viewWishlistLink);

  var wishlistCount = items.length;
  var wishlistCountElement = document.getElementById('wishlistCount');
  wishlistCountElement.textContent = wishlistCount;
}

function removeFromWishlist(name) {
  var wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

  wishlistItems = wishlistItems.filter(function(item) {
    return item.name !== name;
  });

  localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

  updateDropdownWishlist(wishlistItems);
}

// Cart Dropdown Toggle

function cartDropdownToggle() {
  var dropdownContent = document.getElementById("cartDropdownContent");
  dropdownContent.classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.cart-link')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}

// Add to Cart

function addToCart(name, price) {
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  var existingItem = cartItems.find(function(item) {
    return item.name === name;
  });
  
  if (existingItem) {
    alert('Item already exists in the cart!');
    return;
  }
  /*if (existingItem) {
    existingItem.quantity++; 
  } */
  else {
    
    cartItems.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateDropdownCart(cartItems);

  alert('Item added to cart successfully!');
}


function updateDropdownCart(items) {
  var dropdownContent = document.getElementById('cartDropdownContent');
  dropdownContent.innerHTML = '';

  items.forEach(function(item) {
    var listItem = document.createElement('div');
    listItem.classList.add('cart-item');

    var itemName = document.createElement('span');
    itemName.textContent = ' 🌳 ' + item.name + ' - ₹' + item.price;
    itemName.classList.add('item-name');
    listItem.appendChild(itemName);

    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', function() {
      removeFromCart(item.name);
    });
    listItem.appendChild(removeButton);

    var goToCartButton = document.createElement('button');
    goToCartButton.textContent = 'Go to Cart';
    goToCartButton.classList.add('go-to-cart-btn');
    goToCartButton.addEventListener('click', function() {
      window.location.href = 'cart(1).html'; 
    });
    listItem.appendChild(goToCartButton);

    dropdownContent.appendChild(listItem);
  });

  var viewCartLink = document.createElement('a');
  viewCartLink.textContent = 'View Cart';
  viewCartLink.href = 'cart(1).html';
  viewCartLink.classList.add('view-cart-link');
  dropdownContent.appendChild(viewCartLink);

  var cartCount = items.reduce(function(total, item) {
    return total + item.quantity; 
  }, 0);
  var cartCountElement = document.getElementById('cartCount');
  cartCountElement.textContent = cartCount;
}

function removeFromCart(name) {
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Remove item from cart
  cartItems = cartItems.filter(function(item) {
    return item.name !== name;
  });

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateDropdownCart(cartItems);
}
// Initial update of wishlist and cart on page load
var initialWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
updateDropdownWishlist(initialWishlistItems);

var initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
updateDropdownCart(initialCartItems);