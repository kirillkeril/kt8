import ProductModel from "../models/product-model.js";
import ApiErrors from "../errors/ApiErrors.js";
import {ProductDto} from "../dto/product.dto.js";
import UserService from "./user.service.js";
import TokenService from "./token.service.js";

class ProductService {
    async getAllProducts() {
        return ProductModel.find();
    }
    async getProductById(id) {
        return ProductModel.findById(id);
    }
    async newProduct(newData, refreshToken) {
        try {
            const user = await TokenService.validateRefreshToken(refreshToken);
            if (!user) throw ApiErrors.Unauthorized();
            const productDto = new ProductDto({...newData, seller: user.id});
            await ProductModel.create({...productDto});
            return;
        } catch (e) {
            console.log(e)
            throw ApiErrors.BadRequest();
        }
    }
    async deleteProduct(id) {
        return ProductModel.deleteOne({id: id});
    }

    async updateProduct(productData, id) {
        try {
            const prevProduct = await ProductModel.findById(id);
            if (!prevProduct) throw new ApiErrors(404, "Not found");
            const productDto = new ProductDto(productData);

            Object.keys(productDto).map((key) => {
                prevProduct[key] = productDto[key];
            });

            await prevProduct.save();
            return prevProduct;
        } catch (e) {
            throw ApiErrors.BadRequest();
        }
    }
}

export default new ProductService();