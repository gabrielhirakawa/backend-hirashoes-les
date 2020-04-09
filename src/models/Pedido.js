import Sequelize, { Model } from 'sequelize';

class Pedido extends Model {
    static init(sequelize) {
        super.init({
            codigo: Sequelize.STRING,
            tipo: Sequelize.STRING,
            status: Sequelize.STRING,
            total: Sequelize.INTEGER,
            total_com_desconto: Sequelize.INTEGER,
            desconto: Sequelize.INTEGER,
            frete: Sequelize.INTEGER,
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Produto, { foreignKey: 'pedido_id', through: 'itens_pedidos', as: 'itens' });
        this.belongsToMany(models.Pedidos_Cartoes, { foreignKey: 'pedido_id', through: 'pedidos_cartoes', as: 'cartoes' });
        this.belongsTo(models.Cliente, { foreignKey: 'user_id', as: 'cliente' });
        this.belongsTo(models.Endereco, { foreignKey: 'endereco_id', as: 'endereco' });
    }
}

export default Pedido;