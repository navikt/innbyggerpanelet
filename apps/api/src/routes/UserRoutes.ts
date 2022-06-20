import { Router } from 'express';
import { database } from '../loaders';
import { User } from '../models/user/UserEntity';
import { IUserSearch, UserService } from '../services';
import { adminAuthenticated } from './middleware/authenticationHandler';

const userRoutes = Router();

userRoutes.get('/', adminAuthenticated, async (req, res, next) => {
    try {
        const queries = req.query as unknown as IUserSearch;

        const userService = new UserService(database);
        const result: User[] = await userService.search(queries);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default userRoutes;
