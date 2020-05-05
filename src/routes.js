import { Router } from "express";
import SessionsController from './controllers/SessionsController';
import UserController from './controllers/UserController';
import EnderecoController from './controllers/EnderecoController';
import PedidosController from './controllers/PedidosController';
import ProdutosController from './controllers/ProdutosController';
import CupomController from "./controllers/CupomController";
import CartaoController from "./controllers/CartaoController";

import authMiddleware from './middlewares/auth';
import TrocasController from "./controllers/TrocasController";


const routes = new Router();

routes.get('/', (req, res) => {
    console.log("server is running!");
    res.json({ message: "server is running!"});
});

routes.post('/sessions', SessionsController.store);


routes.get('/products', ProdutosController.index);

//Cupons
routes.get('/cupons/:codigo',  CupomController.index);
routes.get('/cupons',  CupomController.show);
routes.post('/cupons',  CupomController.store);


// Pedidos
routes.post('/pedidos', PedidosController.store);
routes.get('/pedidos', PedidosController.index);
routes.get('/pedidos/:id', PedidosController.show);

// User
routes.get('/users/:user_id', UserController.index);
routes.post('/users', UserController.store);

// Cartões
routes.post('/:user_id/cartoes', CartaoController.store);
routes.delete('/:user_id/cartoes/:cartao_id', CartaoController.delete);
routes.get('/:user_id/cartoes', CartaoController.index);

// Endereços
routes.post('/:user_id/enderecos', EnderecoController.store);
routes.get('/:user_id/enderecos', EnderecoController.index);

// Trocas
routes.post('/:user_id/trocas', TrocasController.store);
routes.put('/:user_id/trocas/:troca_id', TrocasController.update);
routes.get('/:user_id/trocas', TrocasController.index);
routes.get('/trocas', TrocasController.show);

module.exports = routes;