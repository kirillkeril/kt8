export class ArticleDto {
    title;
    description;
    link;
    constructor(model) {
        this.title = model.title;
        this.description = model.description;
        this.link = model.link;
    }
}