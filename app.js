const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { parse } = require('path');
const { json } = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/',(req,res)=>{

    res.setHeader('Content-Type','text/html');
    res.sendFile('./public/index.html')
    
});

app.get('/get-movie',(req,res)=>{
    const file = fs.readFileSync('./movies.json');

    res.setHeader("Content-Type","text/json");
    res.send(file)
})

app.post('/new',(req,res)=>{

    const name = req.body.name;
    const rating = req.body.rating;
    
    //abrir archivo
    let file = fs.readFileSync('./movies.json','utf-8');
    console.log(file);
    //convertilo a un arreglo
    let json = JSON.parse(file);
    //insertar un nuevo elemento
    json.movies.push({'name':name, 'rating': parseInt(rating)})
    //guardar json en el archivo
    console.log(json)
    fs.writeFileSync('./movies.json',JSON.stringify(json));

    res.setHeader('Content-Type','text/json');
    res.send('Saved success')

});

app.listen(3000,()=>{
    console.log('server initialize')
});