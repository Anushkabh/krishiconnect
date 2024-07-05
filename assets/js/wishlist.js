document.addEventListener('DOMContentLoaded', function() {
    var wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    var wishlistTableBody = document.getElementById('wishlistBody');
    var emptyWishlistBtn = document.getElementById('emptyWishlistBtn');
    var goToCartBtn = document.getElementById('goToCartBtn');

    function renderWishlist() {
        wishlistTableBody.innerHTML = '';

        wishlistItems.forEach(function(item) {
            var row = document.createElement('tr');

            var imageCell = document.createElement('td');
            var image = document.createElement('img');
            image.src = item.imageUrl; 
            image.alt = item.name;
            image.classList.add('data-img');
            image.style.width = '50px';
            image.style.height = 'auto';
            image.style.borderRadius = '5px';
            imageCell.appendChild(image);
            row.appendChild(imageCell);

            var nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            var stockCell = document.createElement('td');
            stockCell.textContent = item.inStock ? 'In Stock' : 'In Stock'; // **Temperory**
            row.appendChild(stockCell);

            var addToCartCell = document.createElement('td');
            var addToCartButton = document.createElement('button');
            addToCartButton.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
            addToCartButton.classList.add('add-to-cart-btn');
            addToCartButton.addEventListener('click', function() {
                addToCart(item.name, item.imageUrl, item.price);
            });
            addToCartCell.appendChild(addToCartButton);
            row.appendChild(addToCartCell);

            var removeCell = document.createElement('td');
            var removeButton = document.createElement('button');
            removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', function() {
                removeFromWishlist(item);
            });
            removeCell.appendChild(removeButton);
            row.appendChild(removeCell);

            wishlistTableBody.appendChild(row);
        });
    }

    function addToCart(name, imageUrl, price) {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        var existingItem = cartItems.find(function(item) {
            return item.name === name;
        });

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({
                name: name,
                imageUrl: imageUrl,
                price: price,
                quantity: 1
            });
        }
        window.alert = function() {};
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Show success toast
        Toastify({
            text: "Product added to cart!",
            duration: 5000,
            gravity: "top",
            innerHeight: 50,
            position: "right",
            backgroundColor: "rgba(0,128,0,0.8)",
        }).showToast();
    }

    function removeFromWishlist(item) {
        var index = wishlistItems.findIndex(function(wishlistItem) {
            return wishlistItem.name === item.name; 
        });
        if (index !== -1) {
            wishlistItems.splice(index, 1);
            localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
            renderWishlist();
        }
    }

    function emptyWishlist() {
        localStorage.removeItem('wishlistItems');
        wishlistItems = [];
        renderWishlist();
    }

    emptyWishlistBtn.addEventListener('click', function() {
        emptyWishlist();
    });

    goToCartBtn.addEventListener('click', function() {
        window.location.href = 'cart.html';
    });

    renderWishlist();
});

