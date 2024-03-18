const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Database Connection Successful'))
    .catch(err => console.error('Database Connection Failed:', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    date: { type: Date, default: Date.now },
});

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

async function getCourses() {
    try {
        // const courses = await Course.find({}).limit(10).sort({ name: 1 });
        const courses = await Course.find();
        console.log('Courses:', courses);
    } catch (error) {
        console.error('Error getting courses:', error);
    }
}

// createCourse();
// getCourses();

// //updating the Document
async function updateDocument(id) {
    try {

        const course = await Course.findById(id);
        if (!course) {
            console.log(course)
            console.log('Course not found');
            return;
        }
        
        course.author = 'Hamza'; // Modify the 'author' property directly

        // Save the modified document to the database
        const result = await course.save();
        console.log('Document updated successfully:', result);
    } catch (err) {
        console.error('Error updating document:', err);
    }
}

updateDocument('65f8b0f95bf327e31a6c0cfd');