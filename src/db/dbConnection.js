const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL,{dbName:"task-mamagement"})
        console.log(`Db Connected Successfully`)
    } catch (error) {
        console.log('error coonecting db',error)
    }
}

module.exports = connectDB