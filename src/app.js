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

// Handle Error:

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode || 500,
        message: error.message || 'Internal Server'
    });
});
module.exports = app;
