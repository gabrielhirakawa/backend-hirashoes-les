import Sequelize, { Model } from 'sequelize';

class Itens_pedidos extends Model {
    static init(sequelize) {
        super.init({
            quantidade: Sequelize.INTEGER,
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Produto, { foreignKey: 'produto_id', as: 'produto' });
        this.belongsTo(models.Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
    }
}

export default Itens_pedidos;