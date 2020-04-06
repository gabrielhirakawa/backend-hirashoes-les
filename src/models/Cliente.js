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

    static associate(models) {
        this.hasMany(models.Endereco, { foreignKey: 'user_id', as: 'enderecos' });
        this.hasMany(models.Telefone, { foreignKey: 'user_id', as: 'telefones' });
        this.hasMany(models.Cartao, { foreignKey: 'user_id', as: 'cartoes' });
        this.hasMany(models.Pedido, { foreignKey: 'user_id', as: 'pedidos' });
    }
}

export default Cliente;