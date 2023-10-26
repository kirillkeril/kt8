import ArticleService from "../services/article.service.js";
class ArticleController {
    async getAll(req,res,next) {
        try {
            const articles = await ArticleService.getAll();
            return res.status(200).json(articles);
        } catch (e) {
            next(e);
        }
    }
    async getById(req,res,next) {
        try {
            const id = req.params.id;
            const article = await ArticleService.getById(id);
            return res.status(200).json(article);
        } catch (e) {
            next(e);
        }
    }
    async addNew(req,res,next) {
        try {
            const data = req.body;
            const article = await ArticleService.addNew(data);
            return res.status(200).json(article);
        } catch (e) {
            next(e);
        }
    }
    async update(req,res,next) {
        try {
            const id = req.params.id;
            const data = req.body;
            const article = await ArticleService.update(data, id);
            return res.status(200).json(article);
        } catch (e) {
            next(e);
        }
    }
    async delete(req,res,next) {
        try {
            const id = req.params.id;
            const article = await ArticleService.delete(id);
            return res.status(200);
        } catch (e) {
            next(e);
        }
    }
}
export default new ArticleController();