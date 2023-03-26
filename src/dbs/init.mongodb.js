'use strict';
const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect');
const {
    mongo: { host, port, databaseName }
} = require('../configs/config.mongodb');
const MONGO_URI = `mongodb://${host}:${port}/${databaseName}`;
class Database {
    constructor() {
        this.connect();
    }

    connect(type = 'mongodb') {
        // if (1 === 1) {
        //     // mongoose.set('debug', true);
        //     // mongoose.set('debug', { color: true });
        // }
        mongoose
            .connect(MONGO_URI, {
                useNewUrlParser: true,
                user: process.env.MONGO_USER,
                pass: process.env.MONGO_PASSWORD
            })
            .then((_) => {
                countConnect();
                console.log('Connect successfully');
            })
            .catch((error) => console.log('ERROR Connect Database', error));
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
