//  relationship using reference

const mongoose = require('mongoose');

const uri = 'mongodb://localhost/relations';
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Count not connect to MongoDB', err));

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
});

const Course = mongoose.model('Course', courseSchema);

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

async function createAuthor(name, bio, website){
    const author = new Author({
        name,
        bio,
        website
    });
    const res = await author.save();
    console.log(res);
}


async function createCourse(name, author){
    const course = new Course({
        name,
        author
    });
    const res = await course.save();
    console.log(res);
}



async function listCourses(){
    const courses = await Course
        .find()
        .populate('author', 'name -_id');
    console.log(courses);
}

// createAuthor('John', 'my bio', 'my website');

// createCourse('Node', '666c31a25170f8ce046356a4');

// listCourses();
