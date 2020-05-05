import Sequelize, { Model } from 'sequelize';

class Pedidos_Cartoes extends Model {
    static init(sequelize) {
        super.init({
            valor: Sequelize.DOUBLE,
            parcelas: Sequelize.INTEGER,
        }, {
            sequelize,
            tableName: 'pedidos_cartoes'
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
        this.belongsTo(models.Cartao, { foreignKey: 'cartao_id', as: 'cartao' });
    }
}

export default Pedidos_Cartoes;