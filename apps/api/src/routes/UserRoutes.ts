import { Router } from 'express';
import { database } from '../loaders';
import { User } from '../models/user/UserEntity';
import { IUserSearch, UserService } from '../services';

const userRoutes = Router();

userRoutes.get('/', async (req, res) => {
    try {
        const queries = req.query as unknown as IUserSearch;

        const userService = new UserService(database);

        const result: User[] | undefined = await userService.search(queries);

        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

userRoutes.post('/', async (req, res) => {
    try {
        const userService = new UserService(database);
        const newUser = req.body as User;

        const result = await userService.create(newUser);

        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

export default userRoutes;
