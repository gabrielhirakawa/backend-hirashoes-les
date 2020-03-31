import Sequelize, { Model } from 'sequelize';

class Telefone extends Model {
    static init(sequelize) {
        super.init({
            numero: Sequelize.STRING,
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: 'user_id', as: 'owner' });
    }
}

export default Telefone;