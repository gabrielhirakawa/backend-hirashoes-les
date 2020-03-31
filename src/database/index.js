import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Cliente from '../models/Cliente';
import Endereco from '../models/Endereco';
import Telefone from '../models/Telefone';

const models = [Cliente, Endereco, Telefone];

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