export default class UserDto {
    email;
    name;
    id;
    isActivated;
    roles;

    constructor(model) {
        this.email = model.email;
        this.email = model.name;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.roles = model.roles;
    }
}