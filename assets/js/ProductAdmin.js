let productTable = document.getElementById("product-table");
let productCreateForm = document.getElementById("ProductCreateForm");
let productUpdateForm = document.getElementById("ProductUpdateForm");
let categorySelect = document.querySelectorAll(".CategorySelect");
const productURL = "http://localhost:3000/products"
const categoryURL = "http://localhost:3000/categories"

document.addEventListener("DOMContentLoaded", function () {
    fetch(productURL)
        .then(response => response.json())
        .then(datas => {
            datas.forEach(data => {
                productTable.innerHTML += `
            <tr>
                <th scope="row">${data.id}</th>
                <td>${data.name}</td>
                <td>${data.category}</td>
                <td>${data.image}</td>
                <td>${data.oldPrice}</td>
                <td>${data.newPrice}</td>
                <td>
                    <a class="btn btn-primary update-btn" data-bs-toggle="modal" data-bs-target="#updatemodal" data-id="${data.id}" href="#">Update</a>
                    <a class="btn btn-danger delete-btn" href="${productURL + "/" + data.id}" >Delete</a>
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
            });
        })

    fetch(categoryURL)
        .then(response => response.json())
        .then(categories => {
            categories.forEach((category, index) => {
                categorySelect.forEach(categorySel => {
                    categorySel.innerHTML += `
                    <option ${index === 0 ? "selected" : ''}>${category.name}</option>
                `   
                });
            })
        })

})

productCreateForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData.entries());
    const response = await fetch(productURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        alert("Succeeded")
    } else {
        console.error("Problem!")
    }

})


productUpdateForm.addEventListener("submit", async function (e) {
    e.preventDefault();


    const formData = new FormData(e.target);
    var Product = Object.fromEntries(formData.entries());
    const ProductId = document.getElementById("updateProductId").value;



    Swal.fire({
        title: "Are you sure?",
        text: "Product will be updated.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            await Swal.fire({
                title: "Updated!",
                text: "Product context has been updated.",
                icon: "success"
            });

            const response = await fetch(`${productURL}/${ProductId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Product)
            })
        }
    });

})
