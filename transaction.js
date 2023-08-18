var order = JSON.parse(localStorage.getItem('order'));

    
    var buyerDetailsContainer = document.getElementById('buyer-details');
    buyerDetailsContainer.innerHTML = 'Buyer Name: ' + order.buyerName + '<br>Email: ' + order.buyerEmail;

    
    var transactionItemsContainer = document.getElementById('transaction-items');


    order.items.forEach(function(item) {
      var itemElement = document.createElement('div');
      itemElement.innerHTML = item.name + ' - Rp ' + item.price + ' - Quantity: ' + item.quantity;

      transactionItemsContainer.appendChild(itemElement);
    });


    localStorage.removeItem('order');