'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require("./index")

class Match extends Model {}
  Match.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      startTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      playerIds: {
        type: DataTypes.JSON, // Store an array of player IDs
        defaultValue: [],
      },
      andarBet:{
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      baharBet: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      winner: {
        type: DataTypes.STRING,
      },
      mainCard: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      tableName: 'matches',
      timestamps: true, // Set to true if you want createdAt and updatedAt fields
    }
  );

    module.exports = Match;
