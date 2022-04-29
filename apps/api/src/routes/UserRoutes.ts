import { Router } from 'express';
import { database } from '../loaders';
import { IPassportSession } from '../loaders/passport';
import { User } from '../models/user/UserEntity';
import { IUserSearch, UserService } from '../services';
import { adminAuthenticated, authenticated, navAuthenticated } from './middleware/authenticationHandler';

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

userRoutes.get('/currentUser', authenticated, async (req, res, next) => {
    try {
        // Need interface for this or possibly find typings?
        const me: string = (req.session as IPassportSession).passport.user.claims.oid;

        const userService = new UserService(database);
        const result: User = await userService.getById(me);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Needs to be defined before /:id
userRoutes.get('/prioritized', navAuthenticated, async (req, res, next) => {
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

userRoutes.get('/:id', navAuthenticated, async (req, res, next) => {
    try {
        const id = req.params.id;

        const userService = new UserService(database);
        const result: User = await userService.getById(id);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

userRoutes.post('/', adminAuthenticated, async (req, res, next) => {
    try {
        const userService = new UserService(database);
        const newUser = req.body as User;

        const result = await userService.create(newUser);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

userRoutes.put('/', authenticated, async (req, res, next) => {
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
