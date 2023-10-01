'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

const config = {
    navbar: {
        search_ph: "Find food",
        address: "Измайловский проспект",
    },
    categories: {
        category1: {
            title: "Наш выбор",
            cards: [{
                r_name: 'Вкусно и точка',
                image: '/img/вкусно_и_точка.jpg',
                cost: 150,
                min_time: 20,
                max_time: 30,
            }, {
                r_name: 'KFC',
                image: '/img/kfc.jpg',
                cost: 300,
                min_time: 10,
                max_time: 15,
            }, {
                r_name: 'KFC',
                image: '/img/kfc.jpg',
                cost: 300,
                min_time: 10,
                max_time: 15,
            }, {
                r_name: 'KFC',
                image: '/img/kfc.jpg',
                cost: 300,
                min_time: 10,
                max_time: 15,
            }, {
                r_name: 'KFC',
                image: '/img/kfc.jpg',
                cost: 300,
                min_time: 10,
                max_time: 15,
            }, {
                r_name: 'KFC',
                image: '/img/kfc.jpg',
                cost: 300,
                min_time: 10,
                max_time: 15,
            }, {
                r_name: 'KFC',
                image: '/img/kfc.jpg',
                cost: 300,
                min_time: 10,
                max_time: 15,
            }, {
                r_name: 'KFC',
                image: '/img/kfc.jpg',
                cost: 300,
                min_time: 10,
                max_time: 15,
            }, {
                r_name: 'KFC',
                image: '/img/kfc.jpg',
                cost: 300,
                min_time: 10,
                max_time: 15,
            }, {
                r_name: 'KFC',
                image: '/img/kfc.jpg',
                cost: 300,
                min_time: 10,
                max_time: 15,
            }, {
                r_name: 'KFC',
                image: '/img/kfc.jpg',
                cost: 300,
                min_time: 10,
                max_time: 15,
            }, {
                r_name: 'KFC',
                image: '/img/kfc.jpg',
                cost: 300,
                min_time: 10,
                max_time: 15,
            }, {
                r_name: 'KFC',
                image: '/img/kfc.jpg',
                cost: 300,
                min_time: 10,
                max_time: 15,
            }]
        }
    }
};

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(body.json());
app.use(cookie());

app.get('/main', (req, res) => {
    return res.status(200).end();
});

app.get('/restaurant/all', (req, res) => {
    return res.json(config.categories.category1.cards);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
