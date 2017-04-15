var express = require('express');
var router = express.Router();
var app = require('../app');

var Book = app.get('models').Book;

// Use this to build a table for the book model
// This forces a DROP TABLE and rebuilds the structure from above schema
// Book.sync({force: true}).then(function () {
//   // insert data here.
// });

router.get('/', function(req, res) {
  console.log('get request');
  // get books from DB
  Book.findAll({})
    .then(function(books) {
      res.send(books);
    });
});


router.post('/', function(req, res) {
  var newBook = req.body;
  console.log('create new book');
  Book.create(newBook)
    .then(function(book) {
      // console.log('new book', book);
      res.sendStatus(201)
    })
    .catch(function(err) {
      console.log('error on create');
      res.sendStatus(500);
    });

});

router.put('/:id', function(req, res) {
  bookId = req.params.id;
  updatedBook = req.body;

  console.log('book to update ', updatedBook);

  Book.update(
    updatedBook,
    {
      where: {
        id: bookId
      }
    }
  )
  .then(function(book) {
    console.log('updated book', book);
    res.sendStatus(200);
  })
  .catch(function(err) {
    console.log('error on update');
    res.sendStatus(500);
  });

  // Book.find({
  //   where: {
  //     id: bookId
  //   }
  // }).then(function(abook) {
  //   if(abook) {
  //     abook.update(updatedBook)
  //       .then(function(booooook) {
  //         console.log('UPDATED BOOK:', booooook);
  //         res.sendStatus(200);
  //       })
  //       .catch(function() {
  //         console.log('here');
  //         res.sendStatus(500);
  //       })
  //   } else {
  //     console.log('book not found');
  //     res.sendStatus(500);
  //   }
  // });


}); // end route



router.delete('/:id', function(req, res) {
  bookId = req.params.id;

  Book.destroy({
    where: {
      id: bookId
    }
  })
  .then(function() {
    console.log('deleted?');
    res.sendStatus(200);
  })
  .catch(function(err) {
    console.log('error on delete');
    res.sendStatus(500);
  });

});

module.exports = router;
