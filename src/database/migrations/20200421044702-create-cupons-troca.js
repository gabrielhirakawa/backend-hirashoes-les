'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('cupons_troca', {
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
      tipo: {
        type: Sequelize.STRING, // promocial ou troca
        allowNull: false,
      },
      codigo: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      utilizado: {
        type: Sequelize.BOOLEAN,
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

    return queryInterface.dropTable('cupons_troca');

  }
};