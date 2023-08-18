function addToCart(name, price) {

    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


    var existingItem = cartItems.find(function(item) {
      return item.name === name;
    });

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({
        name: name,
        price: price,
        quantity: 1
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }