import cors from 'cors';
import { Router } from 'express';
import passport from 'passport';
import config from '../config';
import { IPassportSession } from '../loaders/passport';

const IDPortenRoutes = Router();

IDPortenRoutes.options('/api/idporten/login', cors());
IDPortenRoutes.options('/oauth2/callback', cors());

IDPortenRoutes.get('/api/idporten/login', (req, res, next) => {
    passport.authenticate('idPorten', {
        scope: 'openid profile',
        failureRedirect: '/api/idporten/login'
    })(req, res, next);
});

IDPortenRoutes.get('/oauth2/callback', (req, res, next) => {
    passport.authenticate('idPorten', {
        successRedirect: config.frontend.url + '/#/hjem',
        failureRedirect: '/api/idporten/login'
    })(req, res, next);
});

IDPortenRoutes.get('/oauth2/logout', (req, res, next) => {
    const { iss, sid } = req.query;
    // Set user details, log out.
    (req.session as IPassportSession).passport.user.claims.sid = sid as string;
    (req.session as IPassportSession).passport.user.claims.iss = iss as string;
    res.redirect('/api/idporten/logout');
});

IDPortenRoutes.get('/api/idporten/logout', (req, res, next) => {
    req.logOut(() => {
        res.redirect('https://oidc-ver2.difi.no/idporten-oidc-provider/endsession');
    });
    //res.redirect('https://oidc-ver2.difi.no/idporten-oidc-provider/endsession');
});

export default IDPortenRoutes;
