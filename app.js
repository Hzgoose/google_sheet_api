const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require("./server/middleware/error");
const multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

const app = express();

const path = require('path');
global.appRoot = path.resolve(__dirname);

dotenv.config({path: `${appRoot}/.env`});

console.log((process.env.APPLICATION_PORT || 8080));
app.set('port', (process.env.APPLICATION_PORT || 8080));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(morgan('dev'));

require("./server/route/healh.js")(app, express);
require("./server/route/sheet")(app, express);

app.use(errorHandler);
app.listen(app.get('port'));

process.on('uncaughtException', function (error) {
    console.log(error);
});
