const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose')

// const genres = [
//     { id: 1, name: 'Horror' },
//     { id: 2, name: 'Action' }
// ];

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true },
})

const Genres = mongoose.model('Genres', genreSchema)

// async function createGenre() {
//     const genre = new Genres({
//         name: 'Romance',
//     })
//     try {
//         const result = await genre.save();
//         console.log(result);
//     } catch (err) {
//         console.log(err)
//     }
// }


// async function getGenres() {
//     try {
//         const genre = await Genres.find();
//         console.log(genre);
//     } catch (err) {
//         console.log(err)
//     }
// }

router.get('/', async (req, res) => {
    const genres = await Genres.find();
    res.send(genres);
})

router.post('/', async (req, res) => {
    const { error } = validateSchema(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let genre = new Genres({
        name: req.body.name,
    })
    genre = await genre.save();
    res.send(genre)
})

router.put('/:id', async (req, res) => {
    const { error } = validateSchema(req.body);
    if (error) {
        return res.status(400).send(error.details.message);
    }
    const genre = await Genres.findByIdAndUpdate(req.params.id, { name: req.body.name },
        // To get new one 
        { new: true })
    if (!genre) {
        return res.status(404).send("Genere Not Found")
    }

    res.send(genre);
})

router.delete('/:id',async (req, res) => {
    const genre = await Genres.findOneAndDelete(req.params.id)
    if (!genre) {
        res.status(400).send("Not Found Cant Delete")
    }

    res.send(genre);
})

router.get('/:id', async(req, res) => {
    const genre = await Genres.findById(req.params.id)
    if (!genre) {
        return res.status(404).send('GENRE NOT FOUND')
    } else {
        return res.send(genre);
    }
})

function validateSchema(genre) {
    const schema = {
        name: Joi.string().min(3).max(10).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;


// mongoimport --db genresDb --collection genres --file genre.json --jsonArray
// mongoimport --db mongo-exercise --collection courses --file exercise-data.json --jsonArray