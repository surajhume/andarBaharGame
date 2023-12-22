'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require("./index")

  class Cards extends Model {}
  Cards.init(
    {
      name: DataTypes.STRING,
      img: DataTypes.STRING,
      value: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cards',
      tableName: 'cards',
      timestamps: false, 
    }
  );

  module.exports = Cards;

