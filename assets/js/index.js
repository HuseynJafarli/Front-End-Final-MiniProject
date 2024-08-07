const sliderURL = "http://localhost:3000/sliders";
let carouselDiv = document.querySelector(".carousel-inner");
let carouselIndicators = document.querySelector(".carousel-indicators");
fetch(sliderURL)
    .then(response => response.json())
    .then(datas => {
        datas.forEach((data, index) => {
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
                    class="active" aria-current="true" aria-label="Slide ${index}"></button>
            `
        });
    });














(function () {
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
})();
