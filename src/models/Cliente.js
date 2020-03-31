import Sequelize, { Model } from 'sequelize';

class Cliente extends Model {
    static init(sequelize) {
        super.init({
            email: Sequelize.STRING,
            nome: Sequelize.STRING,
            sobrenome: Sequelize.STRING,
            cpf: Sequelize.STRING,
            status: Sequelize.STRING,
            password: Sequelize.STRING,
        }, {
            sequelize,
        });

        return this;
    }
}

export default Cliente;