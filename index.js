const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground').
    then(() => console.log('Database Connection Successfull')).
    catch(err => console.log(err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    date: { type: Date, default: Date.now },
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Mongo DB',
        author: 'haris',
        tags: ['Mongo', 'Database'],
        isPublished: true,
    });

    try {
        const result = await course.save();
        console.log('Course created:', result);
    } catch (error) {
        console.error('Error creating course:', error);
    }
}
createCourse();

async function getCourses() {
    // const courses = await Course.find({}).limit(10).sort({ name: 1 })
    try {
        const courses = await Course.find({}).limit(10).sort({ name: 1 });
        // const courses = await Course.find();
        console.log('Courses:', courses);
    } catch (error) {
        console.error('Error getting courses:', error);
    }
}

getCourses()