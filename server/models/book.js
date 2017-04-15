var sequelize = require('./index').sequelize;

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Book',
          {
            title: {
              type: DataTypes.STRING,
              allowNull: false
            },
            author: {
              type: DataTypes.STRING,
              allowNull: false
            },
            page_count: {
              type: DataTypes.INTEGER,
              allowNull: false
            },
            published: {
              type: DataTypes.DATE,
              allowNull: false
            }
          },
          {
            freezeTableName: true // Model tableName will be the same as the model name
          }); // end define

};      // end exports
