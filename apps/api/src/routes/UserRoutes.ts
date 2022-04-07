import { Router } from 'express';
import { database } from '../loaders';
import { User } from '../models/user/UserEntity';
import { IUserSearch, UserService } from '../services';
import { ensureAuthentication } from './middleware/authenticationHandler';

const userRoutes = Router();

userRoutes.get('/', async (req, res, next) => {
    try {
        const queries = req.query as unknown as IUserSearch;

        const userService = new UserService(database);
        const result: User[] = await userService.search(queries);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

userRoutes.get('/me', ensureAuthentication, async (req, res, next) => {
    try {
        // Need interface for this or possibly find typings?
        const me: string = req.session.passport.user.claims.oid;

        const userService = new UserService(database);
        const result: User = await userService.getById(me);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Needs to be defined before /:id
userRoutes.get('/prioritized', async (req, res, next) => {
    try {
        // If list is undefined, make it empty
        const criterias = (req.query.criterias as unknown as string[]) || [];

        const userService = new UserService(database);
        const result: User[] = await userService.prioritizedUsers(criterias);

        return res.json(result);
    } catch (error) {
        next(error);
    }
});

userRoutes.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const userService = new UserService(database);
        const result: User = await userService.getById(id);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

userRoutes.post('/', async (req, res, next) => {
    try {
        const userService = new UserService(database);
        const newUser = req.body as User;

        const result = await userService.create(newUser);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

userRoutes.put('/', async (req, res, next) => {
    try {
        const userService = new UserService(database);
        const updatedUser = req.body as User;

        const result = await userService.update(updatedUser.id, updatedUser);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default userRoutes;
