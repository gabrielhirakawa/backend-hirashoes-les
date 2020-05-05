import Sequelize, { Model } from 'sequelize';

class CupomTroca extends Model {
    static init(sequelize) {
        super.init({
            tipo: Sequelize.STRING,
            codigo: Sequelize.STRING,
            utilizado: Sequelize.BOOLEAN,
            valor: Sequelize.DOUBLE,

        }, {
            sequelize,
            tableName: 'cupons_troca'
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: 'user_id', as: 'owner' });
    }

}

export default CupomTroca;