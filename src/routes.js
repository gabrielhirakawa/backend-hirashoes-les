import { Router } from "express";
import SessionsController from './controllers/SessionsController';
import UserController from './controllers/UserController';
import PedidosController from './controllers/PedidosController';
import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
    console.log("server is running!");
    res.json({ message: "server is running!"});
});

routes.post('/sessions', SessionsController.store);
routes.post('/sales', PedidosController.store);
routes.post('/users', UserController.store);

module.exports = routes;