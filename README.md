# Gestion de Stock

This product is being built

## PORT 5000

### Docker Images
https://hub.docker.com/r/gamiralles/backend-miralles-app/tags

## Running Locally

```bash
$ git clone https://github.com/gamiralles/Backend-Miralles.git
$ cd Backend-Miralles
$ npm install
$ npm start
```

## Views 

```bash
../products --> Muestra el listado de productos.
../realtimeproducts --> Permite agregar un producto.
```

## Endpoints GET

```bash
../api/products --> Muestra todos los Arrays en DB products.
../api/products/productID --> Muestra un solo producto con el ID seleccionado.

../api/carts --> Muestra todos los Arrays en DB carts.
../api/carts/cartID --> Muestra un solo el carrito con el ID seleccionado.
```

## Endpoints POST

```bash
../api/products --> Crea un nuevo Producto.

../api/carts --> Crea un nuevo Carrito.
../api/carts/cartID/product/productID --> Agrega un Producto al Carrito.
```

## Endpoints PUT 

```bash
../api/products/productID --> Modifica el producto con el ID seleccionado.

../api/carts/cartID --> Modifica el Carrito con el ID seleccionado.
../api/carts/cartID/products/productID --> Modifica la cantidad del producto con el ID seleccionado.
```

## Endpoints DELETE

```bash
../api/products/productID --> Elimina el producto con el ID seleccionado.

../api/carts/cartID/product/productID --> Elimina el producto con el ID seleccionado del Carrito.
../api/carts/cartID --> Elimina el carrito con el ID seleccionado.
```

## Built Using

- [Express js](https://expressjs.com/es/)
- [Handlebars](https://handlebarsjs.com/)
- [Socket.io](https://socket.io/)
- [MongoDB Atlas](https://www.mongodb.com/es/atlas)
- [Mongoose](https://mongoosejs.com/)
