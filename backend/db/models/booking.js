'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.User,
        {
          as: 'Owner',
          foreignKey: 'userId' }
      )

      Booking.belongsTo(
        models.Spot,
        { foreignKey: 'spotId' }
      )
    }

    // static async checkDates({startDate, endDate}) {
    //   const bookingTests
    // }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
    scopes: {
      owner: {
        attributes: {}
      },
      booker: {
        attributes: {
          exclude: ['id', 'userId', 'createdAt', 'updatedAt']
        }
      }
    }
  });
  return Booking;
};
