var wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
var wishlistItemsContainer = document.getElementById('wishlist-items');


function renderWishlist() {
    wishlistItemsContainer.innerHTML = '';

    wishlistItems.forEach(function(item) {
        var itemElement = document.createElement('div');
        itemElement.classList.add('wishlist-item');

       
        var itemName = document.createElement('span');
        itemName.textContent = item.name;
        itemName.classList.add('item-name');
        itemElement.appendChild(itemName);

        var itemPrice = document.createElement('span');
        itemPrice.textContent = '₹' + item.price;
        itemPrice.classList.add('item-price');
        itemElement.appendChild(itemPrice);
        

        wishlistItemsContainer.appendChild(itemElement);
    });
}


renderWishlist();


function emptyWishlist() {
    localStorage.removeItem('wishlistItems');
    wishlistItems = [];
    renderWishlist();
}