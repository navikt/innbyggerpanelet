import { Router } from "express";

export const internalRouter = Router();


internalRouter.get("/is-alive", (req, res) => {
    res.send({ message: 'Alive' });
});

internalRouter.get("/is-ready", (req, res) => {
    res.send({ message: 'Ready' });
});