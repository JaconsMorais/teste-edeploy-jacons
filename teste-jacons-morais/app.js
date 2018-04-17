var express = require('express');
var app = express();
var request = require('request');
var NodesController = require('./controllers/NodesController.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
	request('http://localhost:5050', function (error, response, body) {
  if(error)
		res.send("Erro ao acessar a aplicação servidora " + error);
	else {
		var nodes = JSON.parse(body);
		var p = NodesController(nodes, false);
		var p2 = NodesController(nodes, true);
		res.send("O caminho mais curto considerando o algoritmo guloso é: " + p.path + " com uma distancia de "+ p.distance +"<br>O caminho mais curto considerando custo médio por aresta é: " + p2.path + " com uma distancia de " + p2.distance);
	}
});
 	//res.send("ok");
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Aplicação cliente rodando na porta 5000!');
});
