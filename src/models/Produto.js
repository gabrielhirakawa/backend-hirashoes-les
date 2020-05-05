import Sequelize, { Model } from 'sequelize';

class Produto extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            quantidade: Sequelize.INTEGER,
            preco: Sequelize.DOUBLE,
            url_img: Sequelize.STRING,
            descricao: Sequelize.STRING,
            status: Sequelize.BOOLEAN
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Categoria, { foreignKey: 'produto_id', through: 'produtos_categorias', as: 'categorias' });
        this.belongsToMany(models.Pedido, { foreignKey: 'produto_id', through: 'itens_pedidos', as: 'itens' });
        this.hasMany(models.Troca, { foreignKey: 'produto_id', as: 'trocas' });
    }
}

export default Produto;