const e = require('express');
const Joi = require('joi');
const express = require('express');
const { application } = require('express');
const app = express(); //app represents this application including a bunch of methods(lie get, put, post, delete)
app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
]
   
app.get('/', (req,res) => {
    res.send("Hello World!. This is Anu Siraj Jencir");
});

app.get('/api/courses', (req,res) => {
    res.send(courses);
});



//......POST......//

app.post('/api/courses', (req, res) => {
    
    // const result = validateCourse(req.body); bz of obj destructing we dont need this line
    // const { error }  = validateCourse(req.body);  //using obj destructing of result which has two property(err $ res). here result.error
    // if(error){
    //     res.status(400).send(error.details[0].message);
    // }

    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);

    if(result.error){
        return res.status(400).send(result.error.details[0].message); //return for not moving further
    }


    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

//........PUT.......//

app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) 
    return res.status(404).send("The course with given ID was not found");

    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }


    // const result = validateCourse(req.body); bz of obj destructing we dont need this line
    // const { error }  = validateCourse(req.body);  //using obj destructing of result which has two property(err $ res). here result.error

    // if(error){
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }

    course.name = req.body.name;
    res.send(course);

});

//............DELETE........//

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) 
    return res.status(404).send("The course with given ID was not found");

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

// function validateCourse(course) {
//     const schema = Joi.object({
//         name : Joi.string().min(3).required()
//     });

//     return schema.validate(course, schema);


// }

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) 
    return res.status(404).send("The course with given ID was not found");
    res.send(course);
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));