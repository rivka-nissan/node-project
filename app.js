require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000
const config = require('./DB/config')
const { errorHandler } = require('./middlewares/errorHandler');


const viewRouter = require('./routes/viewRoutes');
const shoeRouter = require('./routes/shoeRoutes');
const userRouter = require('./routes/userRoutes');

app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/', viewRouter);
app.use('/shoes', shoeRouter);
app.use('/users', userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
