var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';
var Sequelize = require('sequelize');

// REFERENCES
// http://docs.sequelizejs.com/en/v3/docs/getting-started/
// http://mherman.org/blog/2015/10/22/node-postgres-sequelize/#.WO_S0hLyvMU

var sequelize = new Sequelize('postgres://:@localhost:5432/krisszafranski');


var Book = sequelize.define('books', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  page_count: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  published: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

// This forces a DROP TABLE and rebuilds the structure from above schema
// Book.sync({force: true}).then(function () {
//   // insert data here.
// });

router.get('/', function(req, res) {
  console.log('get request');
  // get books from DB
  Book.findAll({}).then(function(books) {
    res.send(books);
  });
});

router.post('/', function(req, res) {
  var newBook = req.body;

  Book.create(newBook).then(function(book) {
    console.log('new book', book);
    res.sendStatus(201)
  })
  .catch(function(err) {
    console.log('error', err.errors);
    res.sendStatus(500);
  });

});

router.delete('/:id', function(req, res) {
  bookID = req.params.id;

  console.log('book id to delete: ', bookID);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'DELETE FROM books WHERE id = $1',
      [bookID],
      function(err, result) {
        done();

        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });

});

router.put('/:id', function(req, res) {
  bookID = req.params.id;
  book = req.body;

  console.log('book to update ', book);

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'UPDATE books SET title=$1, author=$2, genre=$3, published=$4, edition=$5, publisher=$6' +
      ' WHERE id=$7',
      // array of values to use in the query above
      [book.title, book.author, book.genre, book.published, book.edition, book.publisher, bookID],
      function(err, result) {
        if(err) {
          console.log('update error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }); // close connect

}); // end route


module.exports = router;
