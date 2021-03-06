$(document).ready(function () {
    getBooks();

    // add a book
    $('#book-form').on('submit', postBook);
    // delete a book
    $("#book-list").on('click', '.delete', deleteBook);
    // update a book
    $("#book-list").on('click', '.update', updateBook);
});
/**
 * Retrieve books from server and append to DOM
 */
function getBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
  })
  .done(function(books) {
    appendBooks(books);
  })
  .fail(function(err) {
    console.log('could not get books: ', err.statusText);
  })
}
/**
 * Add a new book to the database and refresh the DOM
 */
function postBook(event) {
  console.log('post');
  event.preventDefault();

  var book = {};

  $.each($('#book-form').serializeArray(), function (i, field) {
    book[field.name] = field.value;
  });

  console.log('book: ', book);

  $.ajax({
    type: 'POST',
    url: '/books',
    data: book
  })
  .done(function(response) {
    getBooks();
  })
  .fail(function(err) {
    console.log('could not post a new book', err.statusText);
  });

}

function deleteBook() {
  var id = $(this).parent().data('id');
  console.log(id);

  $.ajax({
    type: 'DELETE',
    url: '/books/' + id
  })
  .done(function(result) {
      getBooks();
  })
  .fail(function(result) {
    console.log('could not delete book.', err.statusText);
  });
}

function updateBook() {
  var id = $(this).parent().data('id');
  console.log(id);

  // make book object
  var book = {};
  var fields = $(this).parent().children().serializeArray();
  fields.forEach(function(field) {
    book[field.name] = field.value;
  });
  console.log(book);

  $.ajax({
    type: 'PUT',
    url: '/books/' + id,
    data: book
  })
  .done(function(result) {
    console.log('updated!!!!');
    getBooks();
  })
  .fail(function(result) {
    console.log('could not update book!', err.statusText);
  });

}

function appendBooks(books) {
  $("#book-list").empty();

  for (var i = 0; i < books.length; i++) {
    var book = books[i];

    $("#book-list").append('<div class="row book"></div>');
    $el = $('#book-list').children().last();
    $el.data('id', book.id);

    $el.append('<input type="text" name="title" value="' + book.title + '" />');
    $el.append('<input type="text" name="author" value="' + book.author + '" />');

    // convert date format to work with HTML5 date input
    var convertedDate = book.published.substr(0, 10);
    var newDate = $('<input type="date" name="published" />');
    newDate.val(convertedDate);
    $el.append(newDate);

    $el.append('<input type="text" name="page_count" value="' + book.page_count + '" />');

    $el.append('<button class="update">Update</button>');
    $el.append('<button class="delete">Delete</button>');
  }
}
