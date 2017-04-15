# Node/Express, PostGRES, Sequelize

Presents a basic CRUD application with Node, Express, and PostgreSQL using the Sequelize ORM package.

This package does not deal with Migrations, Relations, or anything fancy at all. It is meant as an intro for getting started with Sequelize.

## Build Tables from Models

This app does not use Migrations. You'll need to uncomment out the table building lines in `server/models/Book.js`, run the app, then re-comment them out to set up the DB.

## Other Notes

See `server/models/index.js` for other starting notes.

## Sequelize Links
- [Getting Started Docs](http://docs.sequelizejs.com/en/v3/docs/getting-started/)
- [A good CRUD example with more on set-up and migrations](http://mherman.org/blog/2015/10/22/node-postgres-sequelize/#.WO_S0hLyvMU)
- [Solid post on the practicality of Sequelize](https://dzone.com/articles/sequelize-javascript-orm)
  - Has great examples and discusses setting up model file modules and loading them in.
