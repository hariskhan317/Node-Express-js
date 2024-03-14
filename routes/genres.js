const express = require('express');
const router = express.Router();
const Joi = require('joi');
const genres = [
    { id: 1, name: 'Horror' },
    { id: 2, name: 'Action' }
];

router.get('/', (req, res) => {
    res.send(genres);
})

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) {
        return res.status(404).send('GENRE NOT FOUND')
    } else {
        return res.send(genre);   
    }
})

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) {
        res.status(400).send("Not Found Cant Delete")
    }
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})

function validateSchema(genre) {
    const schema = {
        name: Joi.string().min(3).max(10).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;