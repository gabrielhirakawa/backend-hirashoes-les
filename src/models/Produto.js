import Sequelize, { Model } from 'sequelize';

class Produto extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            quantidade: Sequelize.INTEGER,
            preco: Sequelize.INTEGER,
            url_img: Sequelize.STRING,
            descricao: Sequelize.STRING,
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Categoria, { foreignKey: 'produto_id', through: 'produtos_categorias', as: 'categorias' });
        this.belongsToMany(models.Pedido, { foreignKey: 'produto_id', through: 'itens_pedidos', as: 'itens' });
    }
}

export default Produto;