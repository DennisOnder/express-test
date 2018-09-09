const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const courses = ['Course 1', 'Course 2', 'Course 2'];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.listen(port, () => console.log('Listening on port:' + port));