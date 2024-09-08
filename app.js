const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const authRoutes = require('./src/routes/authRoutes');
const todoRoutes = require('./src/routes/todoRoutes');
const errorHandler = require('./src/middlewares/errorHandler');



const app= express();
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes-----------------

app.use('/api/auth/',authRoutes)
app.use('/api/todos/',todoRoutes)

//errror-handler-------------

app.use(errorHandler);

module.exports=app