import { NextFunction, Request, Response } from 'express';

export const ensureAuthentication = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/api/azure/login');
    }
};
