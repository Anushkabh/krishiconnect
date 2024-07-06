// Add to Wishlist

function addToWishlist(name, price) {
  var wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

  var existingItem = wishlistItems.find(function (item) {
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
  Toastify({
    text: 'Product added to wishlist!',
    duration: 5000,
    gravity: 'top',
    innerHeight: 50,
    position: 'right',
    backgroundColor: 'rgba(0,128,0,0.8)',
  }).showToast();
}

function updateDropdownWishlist(items) {
  var dropdownContent = document.getElementById('wishlistDropdownContent');
  dropdownContent.innerHTML = '';

  items.forEach(function (item) {
    var listItem = document.createElement('div');
    listItem.classList.add('wishlist-item');

    var itemName = document.createElement('span');
    itemName.textContent = item.name + ' - ₹' + item.price;
    itemName.classList.add('item-name');
    listItem.appendChild(itemName);

    var addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('add-to-cart-button');
    addToCartButton.addEventListener('click', function () {
      addToCart(item.name, item.price);
    });
    listItem.appendChild(addToCartButton);

    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', function () {
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

  wishlistItems = wishlistItems.filter(function (item) {
    return item.name !== name;
  });

  localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

  updateDropdownWishlist(wishlistItems);
}

// Add to Cart

function addToCart(name, imageUrl, price) {
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  var existingItem = cartItems.find(function (item) {
    return item.name === name;
  });

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({
      name: name,
      imageUrl: imageUrl,
      price: price,
      quantity: 1,
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // Show success toast
  Toastify({
    text: 'Product added to cart!',
    duration: 5000,
    gravity: 'top',
    innerHeight: 50,
    position: 'right',
    backgroundColor: 'rgba(0,128,0,0.8)',
  }).showToast();
}

// Initial update of wishlist on page load
var initialWishlistItems =
  JSON.parse(localStorage.getItem('wishlistItems')) || [];
updateDropdownWishlist(initialWishlistItems);
