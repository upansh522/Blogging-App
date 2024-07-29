const express = require('express');
const mongoose = require('mongoose');
const mongoDbConnect = require('./connection');
const staticRoute = require('./routes/staticRoute');
const userRoute = require('./routes/user');
const path = require('path');
const cookieParser = require('cookie-parser');
const checkAuthentication = require('./middlewares/authenticateToLogin');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthentication("token"));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.static(path.join(__dirname, 'public')));

mongoDbConnect('mongodb://127.0.0.1:27017/BlogApp').then(() => {
    console.log('mongoDbConnected');
}).catch((err) => {
    console.log(err);
});

app.use('/haveblog', staticRoute);
app.use('/backend', userRoute);

app.listen(PORT, () => {
    console.log('Server started on port:', PORT);
});
