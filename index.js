//archivo index.js
var express = require('express');
var fs = require('fs');
const _ = require('underscore');
var https = require('https');
var app = express();

const PUERTO = 4500;

https.createServer({
   cert: fs.readFileSync('orlandito.cer'),
   key: fs.readFileSync('orlandito.key')
 },app).listen(PUERTO, function(){
	console.log('Servidor https corriendo en el puerto 4500');
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Origin', 'https://srv_main2');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    const dirTree = require("directory-tree");
    const directorios = dirTree("M:");
    const folders = [directorios];
    const loQueHayDentroDefolders = folders[0].children;
    res.json(loQueHayDentroDefolders);
});
