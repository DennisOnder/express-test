const express = require('express');
const app = express();
const Joi = require('joi');
const port = process.env.PORT || 5000;

app.use(express.json());

const courses = [
  {
    id: 1,
    name: 'Course 1'
  },
  {
    id: 2,
    name: 'Course 2'
  },
  {
    id: 3,
    name: 'Course 3'
  },
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).json({ notFound: 'Course not found.' });
  }
  res.send(course);  
});

app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  } else {
    const course = {
      id: courses.length + 1,
      name: req.body.name
    }
    courses.push(course);
    res.send(course);
  }
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).json({ notFound: 'Course not found.' });
  } else {
    const schema = {
      name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    } else {
      course.name = req.body.name;
      res.send(course);
    }
  }
});

app.listen(port, () => console.log('Listening on port:' + port));