const socket = io();
const addProductButton = document.getElementById("addProduct");
const productList = document.getElementById("productList");

function isValidObjectId(id) {
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    return checkForHexRegExp.test(id);
}

addProductButton.addEventListener("click", () => {
    const product = {
        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        code: document.getElementById("code").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
    };

    socket.emit("newProduct", product);

    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("code").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
});

socket.on("updateProducts", (products) => {
    productList.innerHTML = "";
    products.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <strong>Id:</strong> ${product.id}, 
        <strong>Title:</strong> ${product.title},
        <strong>Category:</strong> ${product.category},
        <strong>Code:</strong> ${product.code}, 
        <strong>Description:</strong> ${product.description}, 
        <strong>Price:</strong> ${product.price}, 
        <strong>Stock:</strong> ${product.stock}
        <button class="deleteProduct" data-id="${product.id}">Borrar</button>
        `;
        productList.appendChild(listItem);
    });

    document.querySelectorAll(".deleteProduct").forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.currentTarget.getAttribute("data-id");
            
            if (isValidObjectId(productId)) {
                socket.emit("deleteProduct", productId);
            } else {
                console.error(`ID de producto no válido: ${productId}`);
            }
        });
    });
});
