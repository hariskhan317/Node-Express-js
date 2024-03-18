// loadind Mongoose
const mongoose = require('mongoose');

// connection
mongoose.connect('mongodb://localhost/mongo-exercise')
    .then(() => console.log('Db Connection SuccessFull'))
    .catch(err => console.log(err));

// creating Schema
const courseSchema = mongoose.Schema({
    tags: [String],
    data: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
})

//Modeling that schema to read our data in database
const Course = mongoose.model('Course', courseSchema)

// Getting the data List
async function getCourses() {
return await Course.find()
        .sort('-price').select('name author price id');
}

// Running the function to display the data
async function run() {
    const result = await getCourses();
    try {
        console.log(result);
    } catch (error) {
        console.log(error)
    }
}
run();





