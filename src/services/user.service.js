const userModel = require('../models/user.model');
const findByEmail = ({
    email,
    select = { email: 1, password: 1, name: 1, roles: 1, status: 1 }
}) => {
    return userModel
        .findOne({
            email
        })
        .select(select)
        .lean();
};

module.exports = {
    findByEmail
};
