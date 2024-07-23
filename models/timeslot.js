// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class TimeSlot extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   TimeSlot.init({
//     start_time: DataTypes.TIME,
//     end_time: DataTypes.TIME
//   }, {
//     sequelize,
//     modelName: 'TimeSlot',
//   });
//   return TimeSlot;
// };
'use strict';
module.exports = (sequelize, DataTypes) => {
  const TimeSlot = sequelize.define('TimeSlot', {
    timeslot_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
  }, {
    tableName: 'TimeSlots',
    timestamps: true
  });

  TimeSlot.associate = function(models) {
    //
    TimeSlot.hasMany(models.RoomTimeSlot, { foreignKey: 'timeslot_id' })
  };

  return TimeSlot;
}