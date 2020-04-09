import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Cliente from '../models/Cliente';
import Endereco from '../models/Endereco';
import Telefone from '../models/Telefone';
import Cartao from '../models/Cartao';
import Pedido from '../models/Pedido';
import Produto from '../models/Produto';
import Categoria from '../models/Categoria';
import Itens_pedidos from '../models/Itens_pedidos';
import Cupom from '../models/Cupom';
import Pedidos_Cartoes from '../models/Pedidos_Cartoes';

const models = [Cliente, Endereco, Telefone, Cartao, Pedido, Produto, Categoria, Itens_pedidos, Cupom, Pedidos_Cartoes];

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();