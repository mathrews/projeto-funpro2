// Constantes que importam as libs "express" e "path". Há também as constantes que
// inicializam o express e a constante da porta que a aplicação irá rodar.
const express = require("express");
const path = require('path')
var cors = require('cors')
const app = express();
const port = 8080

app.use(express.static(__dirname));// serve
// arquivos estáticos

app.use(cors())

// lê o corpo (string) e converte p/ objeto
app.use(express.urlencoded({ extended: true }));

// GET que instancia a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'))
});

// GET que instancia a página do jogo.
app.get('/grid', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/grid.html'))
});

// Listener que coloca a aplicação em funcionamento na porta da constante definida.
app.listen(port, () => {
    console.log('Listening on port: ' + port)
});
