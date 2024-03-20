const number = require('joi/lib/types/number');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Database Connection Successful'))
    .catch(err => console.error('Database Connection Failed:', err));

const courseSchema = new mongoose.Schema({
    // validation
    name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        // enum will check if the value is presant in the array 
        enum: ['FrontEnd', 'BackEnd', 'DevOps']
    },
    author: String,
    tags: {
        type: Array, 
        validate: {
            validator: async function (v) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        if (result) {
                            resolve(result);
                        } else {
                            reject(new Error("Course Length Should be greater than 1"))
                        }
                        
                    }, 4000);
                })
            },
            message: "Course Length Should be greater than 1"
        }
    },
    isPublished: Boolean,
    date: { type: Date, default: Date.now },
    price: { type: Number, required: function () { return this.isPublished; } }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        // if we try to create course without name then it will not create the course and reject the promise
        name: 'Mongo DB',
        //category: 'FrontEnd',
        author: 'hamza',
        //tags: [], //"Backend", "Django"
        isPublished: true,
        price: 12,
    });

    try {
        const result = await course.save();
        console.log('Course created:', result);
        // handling errors like pro
    } catch (err) {
        for (field in err.errors)
            console.error('Error creating course:', err.errors[field].message);
    }
}

async function getCourses() {
    try {
        // const courses = await Course.find({}).limit(10).sort({ name: 1 });
        const courses = await Course.find();
        console.log('Courses:', courses);
    } catch (error) {
        console.error('Error getting courses:', error);
    }
}

createCourse();
// getCourses();
