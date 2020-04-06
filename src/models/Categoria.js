import Sequelize, { Model } from 'sequelize';

class Categoria extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            quantidade: Sequelize.INTEGER,
            descricao: Sequelize.STRING,
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Produto, { foreignKey: 'categoria_id', through: 'produtos_categorias', as: 'produtos' });
    }
}

export default Categoria;