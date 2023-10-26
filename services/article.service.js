import ArticleModel from "../models/article-model.js";
import {ArticleDto} from "../dto/article.dto.js";
import ApiErrors from "../errors/ApiErrors.js";

class ArticleService {
    async getAll() {
        return ArticleModel.find();
    }
    async getById(id) {
        return ArticleModel.findById(id);
    }
    async addNew(articleData) {
        const articleDto = new ArticleDto({...articleData});
        const article = await ArticleModel.create({...articleDto});
        return article;
    }
    async update(articleData, id) {
        const article = await ArticleModel.findById(id);
        if (!article) throw new ApiErrors(404, "Not found");
        const articleDto = new ArticleDto({...articleData});

        Object.keys(articleDto).map(key => {
            article[key] = articleDto[key]
        });

        await article.save();
        return article;
    }
    async delete(id) {
        return ArticleModel.deleteOne({id: id});
    }
}

export default new ArticleService();