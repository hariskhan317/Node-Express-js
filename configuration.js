const express = require('express');
const config = require('config')

const app = express();
const logger = require('./logger');
const auth = require('./auth');


app.use(logger);

app.use(auth);

// enviroment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`)

// configuration

try {
    const config = require('config');
    console.log(`Application Name: ${config.get('name')}`);
    console.log(`Mail server Name: ${config.get('mail.host')}`);
    console.log(`Mail server password: ${config.get('mail.password')}`);
} catch (error) {
    console.error('Error occurred while retrieving configuration:', error);
}


const genres = [
    { id: 1, name: 'Horror' },
    { id: 2, name: 'Action' }
];

app.get('/', (req, res) => {
    res.send(genres);
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening to ${port}`)
});
