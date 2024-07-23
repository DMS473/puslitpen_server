'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoomTimeSlot = sequelize.define('RoomTimeSlot', {
    room_timeslot_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timeslot_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['available', 'reserved', 'maintenance'],
      allowNull: false
    }
  }, {
    tableName: 'RoomTimeSlots',
    timestamps: true
  });

  RoomTimeSlot.associate = function(models) {
    // associations can be defined here
    RoomTimeSlot.belongsTo(models.Room, { foreignKey: 'room_id' });
    RoomTimeSlot.belongsTo(models.TimeSlot, { foreignKey: 'timeslot_id' });
    RoomTimeSlot.hasMany(models.Reservation, { foreignKey: 'room_timeslot_id' });
  };

  return RoomTimeSlot;
};
