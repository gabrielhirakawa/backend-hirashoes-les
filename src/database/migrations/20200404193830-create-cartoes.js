'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('cartoes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes', // tabela relacionada
          key: 'id',  // campo referenciado
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nome_impresso: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      cvv: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_expiracao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bandeira: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

    });

  },

  down: (queryInterface) => {

    return queryInterface.dropTable('cartoes');

  }
};