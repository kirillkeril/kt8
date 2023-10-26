import {Router} from 'express';
import ProductController from "../controllers/product.controller.js";
import {sellerOnly} from "../middleware/role.middleware.js";


const productRouter = Router();

productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/:id', ProductController.getProductById);
productRouter.post('/add', sellerOnly, ProductController.newProduct);
productRouter.delete('/delete', sellerOnly, ProductController.deleteProduct);
productRouter.put('/change/:id', sellerOnly, ProductController.updateProduct);

export default productRouter;