document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById("loader");
    const headings = loader.querySelectorAll("h3");
  
    // Function to add class with staggered timing
    const staggeredClassAddition = (elements, className, delay) => {
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add(className);
          element.style.opacity = 1; // Ensure opacity is set to 1
        }, index * delay);
      });
    };
  
    // Add initial animation classes
    staggeredClassAddition(headings, "animate", 500);
  
    // Fade out the loader after animations complete
    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 2000); // Total animation duration: 3 * 500ms = 1500ms, add some buffer
  
    // Hide the loader after fade-out animation completes
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 3000); // 2000ms (fade-out duration) + 1000ms (buffer)
  });
  