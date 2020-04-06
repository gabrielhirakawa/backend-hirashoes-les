import Sequelize, { Model } from 'sequelize';

class Pedido extends Model {
    static init(sequelize) {
        super.init({
            codigo: Sequelize.STRING,
            total: Sequelize.INTEGER,
            desconto: Sequelize.INTEGER,
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Produto, { foreignKey: 'pedido_id', through: 'itens_pedidos', as: 'itens' });
        this.belongsTo(models.Cliente, { foreignKey: 'user_id', as: 'cliente' });
        this.belongsTo(models.Endereco, { foreignKey: 'endereco_id', as: 'endereco' });
        this.belongsTo(models.Cartao, { foreignKey: 'cartao_id', as: 'cartao' });
    }
}

export default Pedido;