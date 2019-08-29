'use strict';
module.exports = (sequelize, DataTypes) => {
  const stock = sequelize.define('stock', {
    userId: DataTypes.INTEGER,
    symbol: DataTypes.STRING,
    open: DataTypes.FLOAT,
    close: DataTypes.FLOAT,
    volume: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  stock.associate = function(models) {
    // associations can be defined here
  };
  return stock;
};