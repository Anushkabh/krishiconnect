
let getCartItems = JSON.parse(localStorage.getItem('cartItems'))
let cartItemCountId = document.getElementById("cartItemCount")
cartItemCountId.textContent = getCartItems.length

import { blogs, categories } from "./blogsData.js"

var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});

const trending = document.querySelector(".trending-blogs")

// Sort trending blogs by no of hearts and render them under Trending posts in index.html
blogs
  .sort((a, b) => new Date(b.hearts) - new Date(a.hearts))
  .slice(0, 3)
  .map((blog) => {

    const card = document.createElement("div");
    card.setAttribute("class", "blog-card")
    card.style.flex = 1

    card.innerHTML = `
            <div class="image">
              <img src=${blog.imageUrl} alt="" />
            </div>
            <div class="blog-title ">${blog.title}.</div>
            <p>
              <span>${blog.date}</span>
              <span>
                <span>&hearts;</span>
                <span>${blog.hearts}</span>
              </span>
            </p>
          `

    trending.appendChild(card);
  })