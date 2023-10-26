import ProductService from "../services/product.service.js";
class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const products = await ProductService.getAllProducts();
            return res.status(200).json(products);
        } catch (e) {
            next(e);
        }
    }
    async getProductById(req, res, next) {
        try {
            const id = req.params.id;
            const product = await ProductService.getProductById(id);
            return res.status(200).json(product);
        } catch (e) {
            next(e);
        }
    }
    async newProduct(req, res, next) {
        try {
            const data = req.body;
            const {refreshToken} = req.cookies
            const newProd = await ProductService.newProduct(data, refreshToken);
            console.log(newProd)
            return res.json(newProd);
        } catch (e) {
            console.log(e)
            next(e);
        }
    }
    async deleteProduct(req, res, next) {
        try {
            const id = req.params.id;
            const deletable = await ProductService.deleteProduct(id);
            return res.status(200);
        } catch (e) {
            next(e);
        }
    }
    //TODO протестить
    async updateProduct(req, res, next) {
        try {
            const data = req.body;
            const id = req.params.id;
            const updatedProduct = await ProductService.updateProduct(data, id);
            res.status(200).json(updatedProduct);
        } catch (e) {
            next(e);
        }
    }
}

export default new ProductController();