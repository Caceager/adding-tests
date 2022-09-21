const express = require("express");
const productoModel = require("../productos");
const path = require("path");
const productRouter = express.Router();
const ioSocket = require("../sockets/socket");
productRouter.use(express.json());

productRouter.get('/', async (req, res) => {
   res.send(await productoModel.cargar_productos());
});
productRouter.get('/:id', async (req, res) => {
    res.send(await productoModel.cargarProducto(req.params.id));
});

productRouter.post('/', async (req, res) => {
    const producto = {
        nombre: req.body.title,
        precio: req.body.price,
        imagen: req.body.url,
    }
    const productId = await productoModel.guardar_producto(producto);
    ioSocket.sendProducts();
    res.send({productId});
});

productRouter.delete('/:id', async (req, res) => {
    res.send(await productoModel.borrarProducto(req.params.id));
});
module.exports = productRouter;