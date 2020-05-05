import Sequelize, { Model } from 'sequelize';

class Pedido extends Model {
    static init(sequelize) {
        super.init({
            codigo: Sequelize.STRING,
            tipo: Sequelize.STRING,
            status: Sequelize.STRING,
            total: Sequelize.DOUBLE,
            total_com_desconto: Sequelize.DOUBLE,
            desconto: Sequelize.DOUBLE,
            frete: Sequelize.DOUBLE,
            status_entrega: Sequelize.STRING,
            data_pedido: Sequelize.DATE
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Produto, { foreignKey: 'pedido_id', through: 'itens_pedidos', as: 'itens' });
        this.belongsToMany(models.Cartao, { foreignKey: 'pedido_id', through: 'pedidos_cartoes', as: 'cartoes' });
        this.belongsTo(models.Cliente, { foreignKey: 'user_id', as: 'owner' });
        this.belongsTo(models.Endereco, { foreignKey: 'endereco_id', as: 'endereco' });
        this.hasMany(models.Troca, { foreignKey: 'pedido_id', as: 'trocas' });
    }
}

export default Pedido;