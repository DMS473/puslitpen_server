'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    reservation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    room_timeslot_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reservation_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'confirmed', 'cancelled'],
      allowNull: false
    }
  }, {
    tableName: 'Reservations',
    timestamps: true
  });

  Reservation.associate = function(models) {
    // associations can be defined here
    Reservation.belongsTo(models.User, { foreignKey: 'user_id' });
    Reservation.belongsTo(models.RoomTimeSlot, { foreignKey: 'room_timeslot_id' });
  };

  return Reservation;
};
