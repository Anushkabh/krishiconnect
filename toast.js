document.getElementById("toast-btn").addEventListener("click", function () {
  // Show success toast
  Toastify({
    text: "Product added to cart!",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: "rgba(0,128,0,0.8)",
  }).showToast();
});
