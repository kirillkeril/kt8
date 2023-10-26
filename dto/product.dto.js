export class ProductDto {
    id;
    name;
    price;
    description;
    category;
    amount;
    seller;
    trigger;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.price = model.price;
        this.description = model.description;
        this.category = model.category;
        this.amount = model.amount;
        this.seller = model.seller;
        this.trigger = model.trigger;
    }
}