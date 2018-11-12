
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
const JsonFind = require('json-find');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


server.listen(80);//port 80

const text = fs.readFileSync('Test1.txt');
someMap = JSON.parse(text);
const doc = JsonFind(someMap);
app.post('/data', function(req, res){
    var user = req.body;
    for (const key in user) {
      const valueOfKey = user[key]; // if the value doesn't exist, it's undefined
      someMap[key] = valueOfKey;//add it to the new JSON file if it doesn't exist
    }
    console.log(someMap);
});

app.get('/data', function(req, res){
    var user = req.body;
    for(const key in user){
        if(doc.checkKey(key)===false){//is the key doesn't exist it returns false.
          console.log(key+' is a invalid key.\n');
        }
        else{
          console.log(someMap[key]);
        }
    }
});




