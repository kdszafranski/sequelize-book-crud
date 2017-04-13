var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';
var Sequelize = require('sequelize');

// http://docs.sequelizejs.com/en/v3/docs/getting-started/

var sequelize = new Sequelize('postgres://:@localhost:5432/krisszafranski');


var Book = sequelize.define('books', {
  title: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  page_count: {
    type: Sequelize.INTEGER
  },
  published: {
    type: Sequelize.DATE
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

// This forces a DROP TABLE
// Book.sync({force: true}).then(function () {
//   // insert data here.
// });

router.get('/', function(req, res) {
  console.log('get request');
  // get books from DB
  Book.findAll({}).then(function(books) {
    if(books) {
      res.send(books);
    } else {
      res.sendStatus(500);
    }

  });
});

router.post('/', function(req, res) {
  var newBook = req.body;
  Book.create(newBook).then(function(book) {
    console.log('new book?', book);
    res.sendStatus(201);
  });
  // pg.connect(connectionString, function(err, client, done) {
  //   if(err) {
  //     console.log('connection error: ', err);
  //     res.sendStatus(500);
  //   }
  //
  //   client.query(
  //     'INSERT INTO books (title, author, published, genre, edition, publisher) ' +
  //     'VALUES ($1, $2, $3, $4, $5, $6)',
  //     [newBook.title, newBook.author, newBook.published, newBook.genre, newBook.edition, newBook.publisher],
  //     function(err, result) {
  //       done();
  //
  //       if(err) {
  //         console.log('insert query error: ', err);
  //         res.sendStatus(500);
  //       } else {
  //         res.sendStatus(201);
  //       }
  //     });
  //
  // });

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
