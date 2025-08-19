const { connect } = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI


async function connectDB() {
    try {
        await connect(MONGODB_URI);
        console.log("connected to database")
    } catch (error) {
        console.log(error.message)
        console.log("faild to connect database")
    }

}

module.exports = connectDB;