function searchItems() {
    const searchBar = document.getElementById('searchBar');
    const filter = searchBar.value.toLowerCase().trim();
    const items = document.querySelectorAll('.item');
    const searchResults = document.getElementById('searchResults');
    
    searchResults.innerHTML = '';  // Clear previous results

    // If search bar is empty, hide the search results div and return
    if (filter === '') {
        searchResults.style.display = 'none';
        return;
    }

    let resultsFound = false;
    const addedItems = new Set();  // Set to keep track of added items

    items.forEach(item => {
        const name = item.getAttribute('data-name');
        const category = item.getAttribute('data-category');
        const imgSrc = item.getAttribute('data-img');
        const price = item.getAttribute('data-new-price');
        const oldprice = item.getAttribute('data-old-price');
        const rating = item.getAttribute('data-rating');
        const detailPageUrl = 'detail-product.html'; // Modify this as per your actual detail page URL

        // Ensure all attributes exist and the item hasn't been added yet
        if (name&& oldprice && category && imgSrc && price && rating && !addedItems.has(name)) {
            if (name.toLowerCase().includes(filter) || category.toLowerCase().includes(filter)) {
                const card = document.createElement('div');
               
                card.className = 'card-product';
                
                card.innerHTML = `
                    <img src="${imgSrc}" alt="${name}">
                    <div class="card-body">
                        <h4 class="card-title"><a href=${detailPageUrl} >${name}</a></h4>
                        <div class="price-rating">
                        <div class="card-ratings">
                            ${getStars(rating)}
                            <span class="rating-number">(${rating})</span>
                        </div>
                        <div class="card-price">
                            <span class="discount">₹ ${price}</span>
                            <span class="regular">₹ ${oldprice}</span>
                        </div>
                        </div>
                        <div class="buttons">
                            <a onclick="addToWishlist('${name}', ${price})" class="wishlist-button">
                                <i class="fas fa-heart"></i> Wishlist
                            </a>
                            <a onclick="addToCart('${name}', '${imgSrc}', ${price})" class="add-to-cart-btn">
                                <i class="fas fa-cart-plus"></i> Add to Cart
                            </a>
                        </div>
                    </div>
                `;
                searchResults.appendChild(card);
                addedItems.add(name);  // Add the item to the set
                resultsFound = true;
            }
        }
    });

    if (!resultsFound) {
        const defaultCard = document.createElement('div');
        defaultCard.className = 'default-card';
        defaultCard.innerHTML = `
            <h4 class="card-title" >No results found</h4>
            <p>Please try searching for another item.</p>
        `;
        searchResults.appendChild(defaultCard);
    }

    // Display the search results div
    searchResults.style.display = 'block';
}

function getStars(rating) {
    const fullStar = '<span class="fa fa-star checked"></span>';
    const emptyStar = '<span class="fa fa-star"></span>';
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += fullStar;
        } else {
            stars += emptyStar;
        }
    }
    return stars;
}
