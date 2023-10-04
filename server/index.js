'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(body.json());
app.use(cookie());

const users = [];

const sessions = new Map();

app.get('/main', (req, res) => {
    return res.status(200).end();
});

app.get('/', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.get('/signup', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.get('/restaurant/all', (req, res) => {
    return res.json(config.categories.category1.cards);
});

app.post('/users', (req, res) => {
    if (users.find(x => {
        return x.login === req.body.name;
    })) return res.status(400).json({'reason': 'already exists'});
    const cookie = Math.random().toString();
    sessions.set(cookie, users.push(req.body)-1);
    res.setHeader('Set-Cookie', `session=${cookie}, HttpOnly`);
    console.log(users);
    console.log(sessions);
    return res.status(200).json({});
});

// app.post('/register', (req, res) => {
//     const body = JSON.parse(req.body);

//     return res.json(config.categories.category1.cards);
// });

// app.post('/login', (req, res) => {
//     return res.json(config.categories.category1.cards);
// });

const port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
