const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Car }) {
      this.hasMany(Car, { foreignKey: 'ownerId' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashpass: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};