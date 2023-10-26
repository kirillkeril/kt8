import {Router} from "express";
import ArticleController from "../controllers/article.controller.js";

const articleRouter = Router();

articleRouter.get('/', ArticleController.getAll);
articleRouter.get('/:id', ArticleController.getById);
articleRouter.post('/new', ArticleController.addNew);
articleRouter.put('/update/:id', ArticleController.update);
articleRouter.delete('/delete/:id', ArticleController.delete);

export default articleRouter;