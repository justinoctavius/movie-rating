const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('./public'));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.send('./public/index.html');
});

app.get('/api',(req,res)=>{
    const file = fs.readFileSync('./movies.json','utf-8');
    res.setHeader('Content-Type','text/html');
    res.send(JSON.parse(file));
})

app.post('/new',(req,res)=>{
    const name = req.body.name;
    const rating = req.body.rating;
    const id = req.body.id;

    const file = fs.readFileSync('./movies.json','UTF-8');
    let json = JSON.parse(file);
    json.movies.push({id:parseInt(id),name:name,rating:parseInt(rating)});

    fs.writeFileSync('./movies.json',JSON.stringify(json));

    res.setHeader('Content-Type','text/html');
    res.send('saved successfully');
});


app.listen(port,()=>{console.log("server is running, port: "+port)})