var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


    var orderItemsContainer = document.getElementById('order-items');


    cartItems.forEach(function(item) {
      var itemElement = document.createElement('div');
      itemElement.innerHTML = item.name + ' - $' + item.price + ' - Quantity: ' + item.quantity;
      orderItemsContainer.appendChild(itemElement);
    });