'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('telefones', {
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
        allowNull: false,
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

    return queryInterface.dropTable('telefones');

  }
};