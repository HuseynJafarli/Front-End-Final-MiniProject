let categoryTable = document.getElementById("category-table");
let categoryCreateForm = document.getElementById("CategoryCreateForm");
let categoryUpdateForm = document.getElementById("CategoryUpdateForm");


const categoryURL = "http://localhost:3000/categories"

document.addEventListener("DOMContentLoaded", function () {
    fetch(categoryURL)
        .then(response => response.json())
        .then(datas => {
            datas.forEach(data => {
                categoryTable.innerHTML += `
            <tr>
                <th scope="row">${data.id}</th>
                <td>${data.name}</td>
                <td>${data.image}</td>
                <td>
                    <a class="btn btn-primary update-btn" data-bs-toggle="modal" data-bs-target="#updatemodal" data-id="${data.id}" href="#">Update</a>
                    <a class="btn btn-danger delete-btn" href="${categoryURL + "/" + data.id}" >Delete</a>
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
                        const CategoryId = btn.getAttribute("data-id");

                        fetch(`${categoryURL}/${CategoryId}`)
                            .then(response => response.json())
                            .then(data => {
                                document.getElementById("updateCategoryId").value = data.id;
                                document.getElementById("updateCategoryName").value = data.name;
                                document.getElementById("updateCategoryImage").value = data.image;
                            })
                    })
                })
                
            });
        })
})


categoryCreateForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const category = Object.fromEntries(formData.entries());
    const response = await fetch(categoryURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    });

    if (response.ok) {
        alert("Succeeded");
    } else {
        console.error("Problem");
    }
});


categoryUpdateForm.addEventListener("submit", async function (e) {
    e.preventDefault();


    const formData = new FormData(e.target);
    var Category = Object.fromEntries(formData.entries());
    const CategoryId = document.getElementById("updateCategoryId").value;



    Swal.fire({
        title: "Are you sure?",
        text: "Category will be updated.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            await Swal.fire({
                title: "Updated!",
                text: "Category context has been updated.",
                icon: "success"
            });

            const response = await fetch(`${categoryURL}/${CategoryId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Category)
            })
        }
    });

})