import ApiErrors from "../errors/ApiErrors.js";
import tokenService from "../services/token.service.js";
function getRoles(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw ApiErrors.Unauthorized();

    const accessToken = authHeader.split(' ')[1];
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) throw ApiErrors.Unauthorized();

    return userData.roles;
}

const adminOnly = (req, res, next) => {
    try {
        const roles = getRoles(req);
        if (roles.includes('ADMIN')) return next();

        return(next(ApiErrors.Forbidden()));
    } catch (e) {
        next(e);
    }
}

const sellerOnly = (req, res, next) => {
    try {
        const roles = getRoles(req);
        const farmer = roles.includes('FARMER');
        if(farmer) {
            return next();
        }

        return(next(ApiErrors.Forbidden('',)));
    } catch (e) {
        next(e);
    }
}
export {adminOnly, sellerOnly};