'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservations', {
      reservation_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      room_timeslot_id: {
        type: Sequelize.INTEGER
      },
      reservation_date: {
        type: Sequelize.DATE
      },
      total_price: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'confirmed', 'cancelled']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservations');
  }
};
