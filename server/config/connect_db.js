const mongoose = require('mongoose');

const connect_DB = () => {
    return mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => console.log('MongoDB connected...'))
        .catch((err) => console.log(err));
}

module.exports = connect_DB;