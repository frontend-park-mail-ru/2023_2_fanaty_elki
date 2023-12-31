'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(body.json());
app.use(cookie());

const users = [];

const sessions = new Map();

app.get('/main', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', 'dist', 'index_app.html'));
});

app.get('/', (req, res) => {
    res.set('Cache-control', 'public, max-age=300');
    return res.sendFile(path.resolve(__dirname, '..', 'dist', 'index_app.html'));
});

app.get('/signup', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', 'dist', 'index_app.html'));
});

app.get('/login', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', 'dist', 'index_app.html'));
});

app.get('/restaurants', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', 'dist', 'index_app.html'));
});

app.get('/cart', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', 'dist', 'index_app.html'));
});

app.get('/me', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', 'dist', 'index_app.html'));
});

app.get('/search', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', 'dist', 'index_app.html'));
});

const port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
