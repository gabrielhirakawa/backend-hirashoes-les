import Sequelize, { Model } from 'sequelize';

class Cartao extends Model {
    static init(sequelize) {
        super.init({
            numero: Sequelize.STRING,
            cvv: Sequelize.STRING,
            data_expiracao: Sequelize.STRING,
            nome_impresso: Sequelize.STRING,
            bandeira: Sequelize.STRING,
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: 'user_id', as: 'owner' });
        this.hasMany(models.Pedido, { foreignKey: 'cartao_id', as: 'pedidos' });
    }
}

export default Cartao;