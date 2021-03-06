var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// store all models on app and export app object
app.set('models', require('./models/index'));
module.exports = app;

// must run after setting the models on app
var books = require('./routes/books');

// Middelware
app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/books', books);

// Catchall route
app.get('/', function (req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
