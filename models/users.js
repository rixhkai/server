'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.articles, {
      as: "article",
      foreignKey: "author_id"
     });
  };
  return users;
};