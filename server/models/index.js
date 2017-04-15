var Sequelize = require('sequelize');

// initialize database connection
var sequelize = new Sequelize('postgres://:@localhost:5432/krisszafranski');

// define model names
var models = [
  'Book'
];

// load models from files based on above names
models.forEach(function(model) {
  var path = __dirname + '/' + model;
  console.log('loading model: ', path);
  // export each model by its name
  module.exports[model] = sequelize.import(path);
});

// describe relationships
// (function(m) {
//   m.PhoneNumber.belongsTo(m.User);
//   m.Task.belongsTo(m.User);
//   m.User.hasMany(m.Task);
//   m.User.hasMany(m.PhoneNumber);
// })(module.exports);

// export connection
module.exports.sequelize = sequelize;