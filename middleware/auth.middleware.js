import ApiErrors from "../errors/ApiErrors.js";
import tokenService from "../services/token.service.js";

export default function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiErrors.Unauthorized());
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiErrors.Unauthorized());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiErrors.Unauthorized());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiErrors.Unauthorized());
    }
}