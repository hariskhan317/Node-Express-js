const express = require('express');
const app = express();
const genres = require('./routes/genres')

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <h1>Hello World</h1>
        <a href="http://localhost:5000/genres">Go to genres</a>
    `);
})

app.use('/genres', genres)





const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening to ${port}`)
});

