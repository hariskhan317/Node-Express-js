const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

const genres = [
    { id: 1, name: 'Horror' },
    { id: 2, name: 'Action' }
];

app.get('/', (req, res) => {
    res.send(genres);
})

app.get('/genres', (req, res) => {
    res.send(genres);
})

app.get('/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) {
        return res.status(404).send('GENRE NOT FOUND')
    } else {
        return res.send(genre);   
    }
})

app.post('/genres', (req, res) => {
    const { error } = validateSchema(req.body);
    if (error){
        return res.status(400).send(error.details[0].message)
    }
    const genre = {
        id: genres.length + 1,
        name: req.body.name,
    }
    genres.push(genre)
    res.send(genre)
})

app.put('/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) {
       return res.status(404).send("Genere Not Found")
    }
    const { error } = validateSchema(req.body);
    if (error) {
        return res.status(400).send(error.details.message);
    }
    genre.name = req.body.name;
    res.send(genre);
})

app.delete('/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) {
        res.status(400).send("Not Found Cant Delete")
    }
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening to ${port}`)
});

function validateSchema(genre) {
    const schema = {
        name: Joi.string().min(3).max(10).required()
    }
    return Joi.validate(genre, schema);

}