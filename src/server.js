const express = require("express");
const path = require('path')
const app = express();
const port = 8080

app.use(express.static(__dirname));//serve
// arquivos estáticos

//lê o corpo (string) e converte p/ objeto
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'))
});

app.get('/grid', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/grid.html'))
});

app.listen(port, () => {
    console.log('Listening on port: ' + port)
});
