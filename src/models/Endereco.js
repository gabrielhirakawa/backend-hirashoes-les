import Sequelize, { Model } from 'sequelize';

class Endereco extends Model {
    static init(sequelize) {
        super.init({
            cep: Sequelize.STRING,
            rua: Sequelize.STRING,
            numero: Sequelize.STRING,
            bairro: Sequelize.STRING,
            complemento: Sequelize.STRING,
            cidade: Sequelize.STRING,
            estado: Sequelize.STRING,
            pais: Sequelize.STRING,
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.Cliente, { foreignKey: 'user_id', as: 'owner' });
        this.hasMany(models.Pedido, { foreignKey: 'endereco_id', as: 'pedidos' });
    }
}

export default Endereco;