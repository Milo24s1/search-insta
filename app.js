const express = require('express');
var bodyParser = require('body-parser');
var searchInsta = require('./src/models/searchInsta');

const app = express();
const port = process.env.PORT || 9999;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    console.log('get req came');
    res.render('index');
});
app.post('/search', function(req, res){
    console.log('search req came');
    searchInsta.search(req,res);
});

app.listen(port, function(){
    console.log('Server is running on port:', port);
});
