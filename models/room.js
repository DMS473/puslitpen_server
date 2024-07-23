'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    room_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    room_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price_per_slot: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['available', 'reserved', 'maintenance'],
      allowNull: false
    }
  }, {
    tableName: 'Rooms',
    timestamps: true
  });

  Room.associate = function(models) {
    // associations can be defined here
    Room.hasMany(models.RoomTimeSlot, { foreignKey: 'room_id' })
  };

  return Room;
};
