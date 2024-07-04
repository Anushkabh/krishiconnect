import { blogs, categories } from "./blogsData.js"

console.log(blogs)

const content = document.querySelector(".blog-content")
const topicsList = document.querySelector(".topics-list")
const swiperWrapper = document.querySelector(".swiper-wrapper");

// loop through each category
categories.map(cat => {

    // render categories under explore topics category 
    const topic = document.createElement("a");
    topic.innerHTML = `<a href="#${cat.id}">
                    <li key=${cat.id}>
                      <img src=${cat.image} alt="" />
                      <div>${cat.name}</div>
                    </li>
                  </a>`

    topicsList?.appendChild(topic)


    // render blogs by category
    const section = document.createElement("section");
    section.setAttribute("class", "cards")
    section.setAttribute("id", cat.id)

    const heading = document.createElement("h1");
    heading.innerHTML = `
        ${cat.name}
          <button>
            View more 
          </button>
    `
    // heading.textContent = cat.name

    const cards = document.createElement("div");
    cards.setAttribute("class", "cards-wrapper")

    // filter blogs by category and reader it
    const filteredBlogs = blogs.filter(blog => blog.category === cat.id)
    console.log(filteredBlogs)

    filteredBlogs.map((blog) => {
        const card = document.createElement("div");
        card.setAttribute("class", "blog-card")

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

        cards.appendChild(card);
    })

    section.appendChild(heading)
    section.appendChild(cards)
    content?.appendChild(section)



})

// sort latest blogs by date and render under latest blogs
blogs
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4)
    .map((blog) => {

        const slide = document.createElement("div");
        slide.setAttribute("class", "swiper-slide slide item");
        slide.innerHTML = `<img src=${blog.imageUrl} alt="" />
                <div class="content">
                    <h3>Latest Stories</h3>
                    <h2>${blog.title}</h2>
                    <p>
                        <span>${blog.date}</span>
                        <span>
                            <span className="hearts">&hearts;</span>
                            <span>${blog.hearts}</span>
                        </span>
                    </p>
                </div>`
        swiperWrapper.appendChild(slide)
    })


// latest blogs swiper
var swiper = new Swiper(".home-slider", {
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


