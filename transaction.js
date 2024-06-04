var order = JSON.parse(localStorage.getItem('order'));

// Check if order is null or undefined
if (!order) {
  var buyerDetailsContainer = document.getElementById('buyer-details');
  buyerDetailsContainer.innerHTML = 'No Transactions Found';

  var transactionItemsContainer = document.getElementById('transaction-items');
  transactionItemsContainer.innerHTML = ''; // Clear any existing content
} else {
  var buyerDetailsContainer = document.getElementById('buyer-details');
  buyerDetailsContainer.innerHTML = 'Buyer Name: ' + order.buyerName + '<br>Email: ' + order.buyerEmail;

  var transactionItemsContainer = document.getElementById('transaction-items');

  order.items.forEach(function(item) {
    var itemElement = document.createElement('div');
    itemElement.innerHTML = item.name + ' - Rp ' + item.price + ' - Quantity: ' + item.quantity;

    transactionItemsContainer.appendChild(itemElement);
  });

  // Remove the order from localStorage after displaying
  localStorage.removeItem('order');
}