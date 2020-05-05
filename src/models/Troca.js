import Sequelize, { Model } from 'sequelize';

class Troca extends Model {
    static init(sequelize) {
        super.init({
            tipo: Sequelize.STRING,
            motivo: Sequelize.STRING,
            status: Sequelize.STRING,
            descricao: Sequelize.STRING,
            quantidade: Sequelize.INTEGER,
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: 'user_id', as: 'cliente' });
        this.belongsTo(models.Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
        this.belongsTo(models.Produto, { foreignKey: 'produto_id', as: 'produto' });
        
    }
}

export default Troca;