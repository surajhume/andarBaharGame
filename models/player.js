'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require("./index")

  class Player extends Model {}
  Player.init(
    {
      playerName: {
        type: DataTypes.STRING
      },
      playerEmail: {
        type: DataTypes.STRING
      },
      playerPassword: {
        type: DataTypes.STRING
      },
      playerBalance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
      }
    },
    {
      sequelize,
      modelName: 'Player',
      tableName: 'players',
      timestamps: false, 
    }
  );

  module.exports = Player;

