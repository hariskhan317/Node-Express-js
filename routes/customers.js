const express = require('express');
const router = express.Router();
const {Customers, validateSchema} = require('../model/customers')

router.get('/', async (req, res) => {
    const customers = await Customers.find();
    res.send(customers)
})

router.post('/', async (req, res) => {
    const { error } = validateSchema(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let customer = new Customers({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    })
    customer = customer.save();
})

router.put('/:id', async (req, res) => {
    const customer = Customers.findByIdandUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    }, { new: true })

    const { error } = validateSchema(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    res.send(customer);
})

router.delete('/:id', async (req, res) => {
    const customer = findByIdandDelete(req.params.id);
    if (!genre) {
        res.status(400).send("Not Found Cant Delete")
    }

    res.send(genre);
})

router.get('/:id', async (req, res) => {
    const customer = findById(req.params.id)
    if (!genre) {
        return res.status(404).send('GENRE NOT FOUND')
    } else {
        return res.send(genre);
    }
})

module.exports = router;