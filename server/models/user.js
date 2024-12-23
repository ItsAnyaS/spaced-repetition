'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Topic}) {
     this.hasMany(Topic, {foreignKey: 'userId'})
    }
  }
  User.init({
    username:{
      type:DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    emailAppPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
      type:DataTypes.STRING,
      allowNull: false
    },
    name:{
      type:DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};