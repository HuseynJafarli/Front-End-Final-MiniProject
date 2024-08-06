let sliderTable = document.getElementById("slider-table");
let SliderCreateForm = document.getElementById("SliderCreateForm")
let SliderUpdateForm = document.getElementById("SliderUpdateForm")

const URL = "http://localhost:3000/sliders"

document.addEventListener("DOMContentLoaded", function () {
    fetch(URL)
        .then(response => response.json())
        .then(datas => {
            datas.forEach(data => {
                sliderTable.innerHTML += `<tr>
                <th scope="row">${data.id}</th>
                <td>${data.text}</td>
                <td>${data.description}</td>
                <td>${data.image}</td>
                <td>
                    <a class="btn btn-primary update-btn" data-bs-toggle="modal" data-bs-target="#updatemodal" data-id="${data.id}" href="#">Update</a>
                    <a class="btn btn-danger delete-btn" href="${URL + "/" + data.id}" >Delete</a>
                </td>
              </tr>`

                document.querySelectorAll(".delete-btn").forEach(btn => {
                    btn.addEventListener("click", function (e) {
                        e.preventDefault();

                        Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                await Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });

                                const response = await fetch(e.target.href, {
                                    method: "DELETE"
                                })
                            }
                        });

                    })
                })

                document.querySelectorAll(".update-btn").forEach(btn => {
                    btn.addEventListener("click", function (e) {
                        e.preventDefault();
                        const sliderId = btn.getAttribute("data-id");

                        fetch(`${URL}/${sliderId}`)
                            .then(response => response.json())
                            .then(data => {
                                document.getElementById("updateSliderId").value = data.id;
                                document.getElementById("updateSliderText").value = data.text;
                                document.getElementById("updateSliderDescription").value = data.description;
                                document.getElementById("updateSliderImage").value = data.image;
                            })
                    })
                })
            });
        })
})

SliderUpdateForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const slider = Object.fromEntries(formData.entries());
    const sliderId = document.getElementById("updateSliderId").value;



    Swal.fire({
        title: "Are you sure?",
        text: "Slider will be updated.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            await Swal.fire({
                title: "Updated!",
                text: "Slider context has been updated.",
                icon: "success"
            });

            const response = await fetch(`${URL}/${sliderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(slider)
            })
        }
    });
})

SliderCreateForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const slider = Object.fromEntries(formData.entries());

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(slider)
    })

    if (response.ok) {
        alert("Succeeded");
    } else {
        console.error("Problem")
    }

})
