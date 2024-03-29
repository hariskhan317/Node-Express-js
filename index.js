const express = require('express');
const Joi = require('joi');
const { error } = require('joi/lib/types/lazy');

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3 ' },
]
const app = express()
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get(`/api/courses/:id`, (req, res) => {
    // we are using parseInt because whenever we will use this "req.params.id" it will 
    // return us string so convert that we need to convert it into int
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        return res.status(404).send("This Course is not fouind")
    } else {
        res.send(course)
    }

})

app.post('/api/courses', (req, res) => {

    const { error } = validateSchema(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    //using find method to find the actual course to update and saving it inside the couse constant
    const course = courses.find(c => c.id === parseInt(req.params.id))
    // TO check if that course is presant ?
    if (!course) {
        return res.status(400).send('no Course found')
    }
    // validating the course
    const { error } = validateSchema(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // using that const to update the name
    course.name = req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        return res.status(404).send('Course not Found')
    }
    // Checking the courses array if id matches it will exculdes those items and save in updateCourse.
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

function validateSchema(validate) {
    const schema = {
        name: Joi.string().min(3).max(10).required()
    }
    return Joi.validate(validate, schema);
}