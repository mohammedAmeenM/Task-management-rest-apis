const dotenv = require('dotenv');
dotenv.config()
const app=require('./app');
const connectDB = require('./src/db/dbConnection');

const PORT = process.env.PORT;
connectDB()


app.listen(PORT,()=>{
    console.log(`Server Running ${PORT}`)
})