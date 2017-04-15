var express = require('express');
var router = express.Router();
var app = require('../app');

// require in Book model
var Book = app.get('models').Book;

// @NOTE Uncomment the next block to build the table in postgres
// @NOTE This forces a DROP TABLE and rebuilds the structure from the Book schema
// Book.sync({force: true}).then(function () {
//   // OPTIONAL: insert data here.
// });

router.get('/', function(req, res) {
  console.log('get request');
  // get books from DB
  Book.findAll({
    order: [
      ['updatedAt', 'DESC']
    ]
  })
    .then(function(books) {
      res.send(books);
    });
});


router.post('/', function(req, res) {
  var newBook = req.body;
  console.log('create new book', newBook);

  Book.create(newBook)
    .then(function(book) {
      res.sendStatus(201)
    })
    .catch(function(err) {
      console.log('error on create: ', err);
      res.sendStatus(500);
    });

});


router.put('/:id', function(req, res) {
  bookId = req.params.id;
  updatedBookData = req.body;

  // console.log('book to update: ', updatedBookData);
  Book.update(
    /***
    * we can pass in the entire object if the properties match the model
    * otherwise, we could define just the columns to update
    ***/
    updatedBookData,
    {
      where: {
        id: bookId
      }
    }
  )
  .then(function(book) {
    res.sendStatus(200);
  })
  .catch(function(err) {
    console.log('error on update: ', err);
    res.sendStatus(500);
  });

  // Alt version: Find the book, then update it
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

}); // end put route


router.delete('/:id', function(req, res) {
  bookId = req.params.id;

  Book.destroy({
    where: {
      id: bookId
    }
  })
  .then(function() {
    console.log('delete successful');
    res.sendStatus(200);
  })
  .catch(function(err) {
    console.log('error on delete: ', err);
    res.sendStatus(500);
  });

});

module.exports = router;
