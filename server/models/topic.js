'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Topic.init({
    id: 
    {
      primaryKey: true,
     type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    lastReviewed: DataTypes.DATE,
    interval: DataTypes.INTEGER,
    nextReviewDate: DataTypes.DATE,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};