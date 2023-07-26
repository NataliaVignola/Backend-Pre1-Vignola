import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 8080; //Puerto a 8080 según la consigna de la preentrega

app.use(express.json());

//Instancia del ProductManager
const productManager = new ProductManager('products.json');

//Endpoint para obtener los productos
app.get('/api/products', (req, res) => {
    const {
        limit
    } = req.query;
    let products = productManager.getProducts();

    if (limit) {
        const limitNum = parseInt(limit);
        products = products.slice(0, limitNum);
    }

    res.json(products);
});

//Endpoint para obtener los producto por su ID
app.get('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({
            error: 'Product not found'
        });
    }
});

//Ruta POST para agregar un nuevo producto
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    productManager.addProduct(newProduct);
    res.json(newProduct);
});

//Ruta PUT para actualizar un producto por su ID
app.put('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const fieldsToUpdate = req.body;
    productManager.updateProduct(productId, fieldsToUpdate);
    res.json({
        message: 'Product updated successfully'
    });
});

//Ruta DELETE para eliminar un producto por su ID
app.delete('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    productManager.deleteProduct(productId);
    res.json({
        message: 'Product deleted successfully'
    });
});

//Inicio servidor
app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
