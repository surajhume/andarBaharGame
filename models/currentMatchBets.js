'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require("./index")

class Bets extends Model {}
  Bets.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      playerIds: {
        type: DataTypes.INTEGER,
      },
      andarOrBahar:{
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'matchBets',
      timestamps: false, // Set to true if you want createdAt and updatedAt fields
    }
  );

    module.exports = Bets;
