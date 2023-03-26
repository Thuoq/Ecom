const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();
const appRoutes = require('./routes');
// TODO:  INIT middleware
app.use(morgan('dev'));
app.use(helmet());
// app.use(morgan('combined')) // tieu chuan cua appache
app.use(compression());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

require('./dbs/init.mongodb');

app.use(appRoutes);
// TODO: init DB
// Init routes
// Handle Error:
module.exports = app;
