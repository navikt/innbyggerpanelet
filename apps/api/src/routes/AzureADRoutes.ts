import cors from 'cors';
import { Router } from 'express';
import passport from 'passport';
import config from '../config';

const azureADRoutes = Router();

azureADRoutes.options('/login', cors());
azureADRoutes.options('/oauth2/callback', cors());

azureADRoutes.get('/login', (req, res, next) => {
    passport.authenticate('azureAD', {
        scope: `openid profile ${config.azureAd.clientId}/.default`,
        failureRedirect: 'api/azure/login'
    })(req, res, next);
});

azureADRoutes.get('/oauth2/callback', (req, res, next) => {
    passport.authenticate('azureAD', {
        successRedirect: config.frontend.url + '/#/hjem',
        failureRedirect: '/api/azure/login'
    })(req, res, next);
});

azureADRoutes.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect(config.frontend.url + '/#/');
});

export default azureADRoutes;
