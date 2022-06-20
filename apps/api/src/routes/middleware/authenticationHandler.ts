import { EnumEmployeeRole, EnumUserRole } from '@innbyggerpanelet/api-interfaces';
import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../../lib/errors/http/ForbiddenError';
import { ServerErrorMessage } from '../../lib/errors/messages/ServerErrorMessages';
import { database } from '../../loaders';
import { IPassportSession } from '../../loaders/passport';
import { User } from '../../models/user/UserEntity';
import { EmployeeService } from '../../services/EmployeeService';

interface IReqWithUserPermissions extends Request {
    user: {
        role: EnumUserRole | EnumEmployeeRole;
        id: string;
    };
}

const addUserDetailsToRequest = async (req: IReqWithUserPermissions, res: Response, next: NextFunction) => {
    const azureId: string = (req.session as IPassportSession).passport.user.claims.oid;
    const idPortenId: string = (req.session as IPassportSession).passport.user.claims.sub;

    if (azureId) {
        req.user.id = azureId;

        const employeeService = new EmployeeService(database);
        const result: User = await employeeService.getById(req.user.id);

        req.user.role = result.role as EnumEmployeeRole;
    } else if (idPortenId) {
        req.user.id = idPortenId;
        req.user.role = EnumUserRole.Citizen;
    }

    next();
};

const ensureAuthentication = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/api/azure/login');
    }
};

const isCitizen = (req: IReqWithUserPermissions, res: Response, next: NextFunction) => {
    if (req.user.role === EnumUserRole.Citizen) {
        next();
    } else {
        throw new ForbiddenError({ message: ServerErrorMessage.forbidden() });
    }
};

const isNAV = (req: IReqWithUserPermissions, res: Response, next: NextFunction) => {
    if (req.user.role === EnumEmployeeRole.InsightWorker || req.user.role === EnumEmployeeRole.Admin) {
        next();
    } else {
        throw new ForbiddenError({ message: ServerErrorMessage.forbidden() });
    }
};

const isAdmin = (req: IReqWithUserPermissions, res: Response, next: NextFunction) => {
    if (req.user.role === EnumEmployeeRole.Admin) {
        next();
    } else {
        throw new ForbiddenError({ message: ServerErrorMessage.forbidden() });
    }
};

export const authenticated = [ensureAuthentication, addUserDetailsToRequest]; // No roles required
export const citizenAuthenticated = [ensureAuthentication, addUserDetailsToRequest, isCitizen]; // Citizen role required
export const navAuthenticated = [ensureAuthentication, addUserDetailsToRequest, isNAV]; // Admin or NAV role required
export const adminAuthenticated = [ensureAuthentication, addUserDetailsToRequest, isAdmin]; // Admin role required
