import { EnumUserRole } from '@innbyggerpanelet/api-interfaces';
import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../../lib/errors/http/NotFoundError';
import { ServerErrorMessage } from '../../lib/errors/messages/ServerErrorMessages';
import { database } from '../../loaders';
import { IPassportSession } from '../../loaders/passport';
import { User } from '../../models/user/UserEntity';
import { UserService } from '../../services';

interface IReqWithRole extends Request {
    user: {
        role: EnumUserRole;
    };
}

const addUserRoleToRequest = async (req: IReqWithRole, res: Response, next: NextFunction) => {
    const me: string = (req.session as IPassportSession).passport.user.claims.oid;

    const userService = new UserService(database);
    const result: User = await userService.getById(me);

    req.user.role = result.role;

    next();
};

const ensureAuthentication = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/api/azure/login');
    }
};

const isCitizen = (req: IReqWithRole, res: Response, next: NextFunction) => {
    if (req.user.role === EnumUserRole.Citizen) {
        next();
    } else {
        throw new ForbiddenError({ message: ServerErrorMessage.forbidden() });
    }
};

const isNAV = (req: IReqWithRole, res: Response, next: NextFunction) => {
    if (req.user.role === EnumUserRole.NAV || req.user.role === EnumUserRole.Admin) {
        next();
    } else {
        throw new ForbiddenError({ message: ServerErrorMessage.forbidden() });
    }
};

const isAdmin = (req: IReqWithRole, res: Response, next: NextFunction) => {
    if (req.user.role === EnumUserRole.Admin) {
        next();
    } else {
        throw new ForbiddenError({ message: ServerErrorMessage.forbidden() });
    }
};

export const authenticated = [ensureAuthentication]; // No roles required
export const citizenAuthenticated = [ensureAuthentication, addUserRoleToRequest, isCitizen]; // Citizen role required
export const navAuthenticated = [ensureAuthentication, addUserRoleToRequest, isNAV]; // Admin or NAV role required
export const adminAuthenticated = [ensureAuthentication, addUserRoleToRequest, isAdmin]; // Admin role required
