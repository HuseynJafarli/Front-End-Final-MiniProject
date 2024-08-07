const sliderURL = "http://localhost:3000/sliders";
const categoryURL = "http://localhost:3000/categories";
const productURL = "http://localhost:3000/products";
let carouselDiv = document.querySelector(".carousel-inner");
let carouselIndicators = document.querySelector(".carousel-indicators");
let categoryDiv = document.getElementById("category-bottom");
let productsDiv = document.querySelector(".products-row");
let search = document.getElementById("submit-form");
let searchInput = document.getElementById("search-input");

async function fetchData() {
    try {
        const sliderResponse = await fetch(sliderURL);
        const sliders = await sliderResponse.json();

        sliders.forEach((data, index) => {
            carouselDiv.innerHTML += `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${data.image}" class="d-block w-100" alt="">
                    <div class="slider-content">
                        <h1 class="display-1">${data.text}</h1>
                        <p>${data.description}</p>
                    </div>
                </div>
            `;
            carouselIndicators.innerHTML += `
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}"
                    class="${index === 0 ? 'active' : ''}" aria-current="true" aria-label="Slide ${index}"></button>
            `;
        });

        const productResponse = await fetch(productURL);
        const products = await productResponse.json();

        DisplayProducts(products)
        searchInput.addEventListener("input", function () {
            const query = searchInput.value.trim().toLowerCase();
            let filteredProducts = products.filter(product => {
                return product.name.toLowerCase().includes(query);
            });
            DisplayProducts(filteredProducts);
        });

        const categoryResponse = await fetch(categoryURL);
        const categories = await categoryResponse.json();

        categories.forEach(category => {
            const categoryCount = products.filter(product => product.category === category.name).length;
            categoryDiv.innerHTML += `
                <div class="category-card">
                    <img src="${category.image}" alt="${category.name}">
                    <a href="#">${category.name}</a>
                    <p>${categoryCount} items</p>
                </div>
            `;
        });




    } catch (error) {
        console.error(error);
    }
}


function DisplayProducts(products) {
    productsDiv.innerHTML = "";
    products.forEach(product => {
        productsDiv.innerHTML += `
                    <div class="product-card">
                        <img src="${product.image}" alt="">
                        <div class="product-card-content">
                            <a href="">
                                <p>${product.category}</p>
                            </a>
                            <a href="">
                                <h1>${product.name}</h1>
                            </a>
                            <div id="prod-rating">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star"></i>
                                <span>(4.0)</span>
                            </div>
                            <p>By <span style="color: #3BB77E; cursor: pointer;">Nestfood</span></p>
                            <div class="product-card-bottom">
                                <div class="product-price">
                                    <span>$${product.newPrice}</span>
                                    <span class="old-price">$${product.oldPrice}</span>
                                </div>
                                <div class="add-cart">
                                    <a class="add" href="shop-cart.html"><i class="bi bi-cart3"></i>Add </a>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    })
}


document.addEventListener("DOMContentLoaded", function () {
    fetchData();
    startCountdown();

    
})

function startCountdown() {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        dayMonth = "12/30/",
        countDownDate = new Date(dayMonth + yyyy).getTime();

    today = mm + "/" + dd + "/" + yyyy;

    let x = setInterval(function () {
        const now = new Date().getTime(),
            distance = countDownDate - now;

        let daysElements = document.getElementsByClassName("days");
        let hoursElements = document.getElementsByClassName("hours");
        let minutesElements = document.getElementsByClassName("minutes");
        let secondsElements = document.getElementsByClassName("seconds");

        for (let i = 0; i < daysElements.length; i++) {
            daysElements[i].innerText = Math.floor(distance / day);
        }
        for (let i = 0; i < hoursElements.length; i++) {
            hoursElements[i].innerText = Math.floor((distance % day) / hour);
        }
        for (let i = 0; i < minutesElements.length; i++) {
            minutesElements[i].innerText = Math.floor((distance % hour) / minute);
        }
        for (let i = 0; i < secondsElements.length; i++) {
            secondsElements[i].innerText = Math.floor((distance % minute) / second);
        }

        if (distance < 0) {
            clearInterval(x);
            for (let i = 0; i < daysElements.length; i++) {
                daysElements[i].innerText = "0";
            }
            for (let i = 0; i < hoursElements.length; i++) {
                hoursElements[i].innerText = "0";
            }
            for (let i = 0; i < minutesElements.length; i++) {
                minutesElements[i].innerText = "0";
            }
            for (let i = 0; i < secondsElements.length; i++) {
                secondsElements[i].innerText = "0";
            }
        }
    }, 1000);
}
