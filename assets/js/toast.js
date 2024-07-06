// document.getElementById("toast-btn").addEventListener("click", function () {
//   // Show success toast
//   Toastify({
//     text: "Product added to cart!",
//     duration: 3000,
//     gravity: "bottom",
//     position: "right",
//     backgroundColor: "rgba(0,128,0,0.8)",
//   }).showToast();
// });

//added this

document.addEventListener('DOMContentLoaded', function () {
  // Select all elements with the class 'add-to-cart-btn'
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  // Loop through each button and add an event listener
  addToCartButtons.forEach((button) => {
    // Check if the event listener is already attached
    if (!button.dataset.listenerAttached) {
      button.addEventListener('click', function (event) {
        // Get product name and price from button attributes
        const productName = event.target.getAttribute('data-product-name');
        const productPrice = event.target.getAttribute('data-product-price');

        // Add product to cart (implement your own logic here)
        addToCart(productName, productPrice);
        alert(`${productName} added to cart successfully!!`);
      });

      // Mark the button to indicate that the event listener is attached
      button.dataset.listenerAttached = 'true';
    }
  });

  // Example addToCart function (implement your own logic)
  function addToCart(product, price) {
    console.log(`Product added to cart: ${product}, Price: ${price}`);
    // Add your cart logic here
  }
});
