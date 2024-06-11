const socket = io();
const addProductButton = document.getElementById("addProduct");
const productList = document.getElementById("productList");

addProductButton.addEventListener("click", () => {
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    description: document.getElementById("description").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
  };

  socket.emit("newProduct", product);

  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("description").value = "";
  document.getElementById("code").value = "";
  document.getElementById("stock").value = "";
});

socket.on("updateProducts", (products) => {
  productList.innerHTML = "";
  products.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <strong>Id:</strong> ${product.id}, 
    <strong>Title:</strong> ${product.title}, 
    <strong>Price:</strong> ${product.price}, 
    <strong>Description:</strong> ${product.description}, 
    <strong>Code:</strong> ${product.code}, 
    <strong>Stock:</strong> ${product.stock}
    <button class="deleteProduct" data-id="${product.id}">Borrar</button>
    `;
    productList.appendChild(listItem);
  });

  document.querySelectorAll(".deleteProduct").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productStockId = event.currentTarget.getAttribute("data-id");
      const productId = Number(productStockId);
      socket.emit("deleteProduct", productId);
    });
  });
});

document.querySelectorAll(".deleteProduct").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productStockId = event.currentTarget.getAttribute("data-id");
    const productId = Number(productStockId);
    socket.emit("deleteProduct", productId);
  });
});
