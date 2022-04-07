import { Router } from 'express';
import { ensureAuthentication } from './middleware/authenticationHandler';

const authRoutes = Router();

authRoutes.get('/autenticated', ensureAuthentication, (req, res, next) => {
    try {
        res.json({ message: 'OK' });
    } catch (error) {
        next(error);
    }
});

export default authRoutes;
