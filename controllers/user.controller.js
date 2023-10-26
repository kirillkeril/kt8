import UserService from "../services/user.service.js";
import tokenService from "../services/token.service.js";
import userService from "../services/user.service.js";
import {validationResult} from 'express-validator';
import ApiErrors from "../errors/ApiErrors.js";

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiErrors.BadRequest("Validation error", errors.array()));
            }
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {httpOnly: true, maxAge: tokenService.refreshMaxAgeForCookie});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            console.log(email, password);
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {httpOnly: true, maxAge: tokenService.refreshMaxAgeForCookie});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200)
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.body;
            const userData = await UserService.refresh(refreshToken);
            // res.cookie('refreshToken', userData.refreshToken, {httpOnly: true, maxAge: tokenService.refreshMaxAgeForCookie, sameSite: false});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await UserService.getUsers();
            res.status(200).json({data: users});
        } catch (e) {
            next(e);
        }
    }
    async getUser(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) res.status(401);

            const accessToken = authHeader.split(" ")[1];

            const user = await UserService.getUser(accessToken);
            console.log(user);
            return res.send(`Привет, ${user.email}!`);
        } catch (e) {
            next(e);
        }
    }

    async setRole(req, res, next) {
        try{
            const userId = req.params.id;
            const userData = await userService.setUserRole(userId, req.body.role);
            res.cookie('refreshToken', userData.refreshToken, {httpOnly: true, maxAge: tokenService.refreshMaxAgeForCookie, sameSite: false});
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.id;
            const user = await userService.deleteUser(userId);
            return res.status(200);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();
