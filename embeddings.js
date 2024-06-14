// //  relationship using embedding

// const mongoose = require('mongoose');

// const uri = 'mongodb://localhost/relations';
// mongoose.connect(uri)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.log('Count not connect to MongoDB', err));

// const authorSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     bio: String,
//     website: String
// });

// const Author = mongoose.model('Author', authorSchema);

// const courseSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     author: {
//         type: authorSchema,
//         required: true
//     }
// });

// const Course = mongoose.model('Course', courseSchema);

// async function createCourse(name, author){
//     const course = new Course({
//         name,
//         author
//     });
//     const res = await course.save();
//     console.log(res);
// }

// async function listCourses(){
//     const courses = await Course
//         .find();
//     console.log(courses);
// }

// async function updateCourse(id, up){
//     const course = await Course.findByIdAndUpdate(id, up);
//     console.log(course);
// }

// // createCourse('Node', new Author({name: 'Smith', bio: 'my bio', website: 'my website'}));

// // updateCourse('666c407695d81bd615090455', {'author.name': 'new name'});

// // listCourses();












// # using an array of subdocuments
//  relationship using embedding

const mongoose = require('mongoose');

const uri = 'mongodb://localhost/relations';
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Count not connect to MongoDB', err));

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    authors: [authorSchema]
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(name, authors){
    const course = new Course({
        name,
        authors
    });
    const res = await course.save();
    console.log(res);
}

async function listCourses(){
    const courses = await Course
        .find();
    console.log(courses);
}

async function updateCourse(id, up){
    const course = await Course.findByIdAndUpdate(id, up);
    console.log(course);
}

async function addAuthor(id, author){
    const course = await Course.findById(id);
    course.authors.push(author);
    const res = await course.save();
    console.log(res);
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    course.authors.id(authorId).deleteOne();
    await course.save();
}

// createCourse('Python', 
//     [new Author({name: 'Smith', bio: 'my bio', website: 'my website'}),
//     new Author({name: 'Johnny', bio: 'my bio', website: 'my website'})],
// );

// updateCourse('666c407695d81bd615090455', {'author.name': 'new name'});

// listCourses();

// addAuthor('666c44649a3164a01c69a140', new Author({name: 'X', bio: 'new bio', website: 'new website'}));

removeAuthor('666c44649a3164a01c69a140', '666c45be0600405af60da9fd');
