//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

//port number
const port = 3000;

//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/NFORM')

//on connection
mongoose.connection.on('connected', () => {
    console.log('connected to database MongoDB')
});

mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in database connection' + err)
    }
});


//adding middleware .cors
app.use(cors());

//body parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

//testing server
app.get('/', (req, res) => {
    res.send('foobar');
});

app.listen(port, () => {
    console.log('server started' + port);
});