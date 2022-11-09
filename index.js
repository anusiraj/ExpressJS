const e = require('express');
const express = require('express');
const app = express(); //app represents this application including a bunch of methods(lie get, put, post, delete)

app.get('/', (req,res) => {
    res.send("Hello World!. This is Anu Siraj Jencir");
});
app.get('/api/courses', (req,res) => {
    res.send([1,2,3]);
});

app.get('/api/courses/:id', (req,res) => {
    res.send(req.params.id);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));