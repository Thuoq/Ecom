'use strict';
const _ = require('lodash/fp');

const getInfoData = ({ fields = [], object }) => {
    return _.pick(fields, object);
};

module.exports = {
    getInfoData
};
