import Sequelize, { Model } from 'sequelize';

class Cartao extends Model {
    static init(sequelize) {
        super.init({
            numero: Sequelize.STRING,
            cvv: Sequelize.STRING,
            data_expiracao: Sequelize.STRING,
            nome_impresso: Sequelize.STRING,
            bandeira: Sequelize.STRING,
            status: Sequelize.BOOLEAN
        }, {
            sequelize,
            tableName: 'cartoes'
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: 'user_id', as: 'owner' });
        this.belongsToMany(models.Pedidos_Cartoes, { foreignKey: 'pedido_id', through: 'pedidos_cartoes', as: 'cartoes' });
    }
}

export default Cartao;