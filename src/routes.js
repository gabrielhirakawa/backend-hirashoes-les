import { Router } from "express";
import SessionsController from './controllers/SessionsController';
import UserController from './controllers/UserController';
import EnderecoController from './controllers/EnderecoController';
import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
    console.log("server is running!");
    res.json({ message: "server is running!"});
});

routes.post('/sessions', SessionsController.store);
routes.post('/users', UserController.store);
routes.post('/users/:user_id/addresses', EnderecoController.store);

module.exports = routes;