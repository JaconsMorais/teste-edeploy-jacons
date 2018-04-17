var express = require('express');
var app = express();
const fs = require('fs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
 fs.readFile('data.json', 'utf-8', function(error, response) {
    console.log(JSON.parse(response))
    if (error) {
      res.json(error);
    }
    res.json(JSON.parse(response));
  });
});

app.listen(process.env.PORT || 5050, function () {
  console.log('Aplicação servidora rodando na porta 5050');
});
