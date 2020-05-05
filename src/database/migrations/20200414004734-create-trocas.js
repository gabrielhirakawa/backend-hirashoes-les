'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('trocas', {
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
      pedido_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pedidos', // tabela relacionada
          key: 'id',  // campo referenciado
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      produto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'produtos', // tabela relacionada
          key: 'id',  // campo referenciado
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      motivo: {
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

    return queryInterface.dropTable('trocas');

  }
};