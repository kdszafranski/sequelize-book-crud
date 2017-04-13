var sequelize = require('sequelize');
console.log(sequelize);

var bookSchema = {
                  title: {
                    type: sequelize.STRING,
                    allowNull: false
                  },
                  author: {
                    type: sequelize.STRING,
                    allowNull: false
                  },
                  page_count: {
                    type: sequelize.INTEGER,
                    allowNull: false
                  },
                  published: {
                    type: sequelize.DATE,
                    allowNull: false
                  }
                };

var Book = sequelize.define('books', bookSchema, {
  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Book;
