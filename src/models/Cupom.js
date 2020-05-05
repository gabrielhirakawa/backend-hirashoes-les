import Sequelize, { Model } from 'sequelize';

class Cupom extends Model {
    static init(sequelize) {
        super.init({
            tipo: Sequelize.STRING,
            codigo: Sequelize.STRING,
            status: Sequelize.STRING,
            percentual_desconto: Sequelize.INTEGER,
            quantidade: Sequelize.INTEGER,

        }, {
            sequelize,
            tableName: 'cupons'
        });

        return this;
    }

}

export default Cupom;