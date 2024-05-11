var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    
    var cartItemsContainer = document.getElementById('cart-items');
    var buyerNameInput = document.getElementById('buyer-name');
    var buyerEmailInput = document.getElementById('buyer-email');


    cartItems.forEach(function(item) {
      var itemElement = document.createElement('div');
      itemElement.classList.add('cartlist');
      itemElement.innerHTML =  "<span>"+item.name+"</span>  <span>"+item.price+"</span><span>"+item.quantity+"</span>";

      
      var increaseQuantityButton = document.createElement('button');
      increaseQuantityButton.innerText = '+';
      increaseQuantityButton.onclick = function() {
        item.quantity++;
        updateCartDisplay();
      };
      itemElement.appendChild(increaseQuantityButton);

      cartItemsContainer.appendChild(itemElement);
    });
    function updateCartDisplay() {
        
        cartItemsContainer.innerHTML = '';
  
        
        cartItems.forEach(function(item) {
          var itemElement = document.createElement('div');
          itemElement.classList.add('cartlist');
          itemElement.innerHTML =  "<span>"+item.name+"</span>  <span>"+item.price+"</span><span>"+item.quantity+"</span>";
  
          
          var increaseQuantityButton = document.createElement('button');
          increaseQuantityButton.innerText = '+';
          increaseQuantityButton.onclick = function() {
            item.quantity++;
            updateCartDisplay();
          };
          itemElement.appendChild(increaseQuantityButton);
  
          cartItemsContainer.appendChild(itemElement);
        });
  
        
        updateSubtotal();
      }
      function updateSubtotal() {
        var subtotal = 0;
  
        
        cartItems.forEach(function(item) {
          subtotal += item.price * item.quantity;
        });
  
        
        var subtotalElement = document.getElementById('subtotal');
        subtotalElement.innerHTML = 'Subtotal: Rp ' + subtotal.toFixed(2);
      }
  
      
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

    
         window.location.href = '/Html-Files/transaction.html';

  
        
        emptyCart();
  
        
    
      }
  