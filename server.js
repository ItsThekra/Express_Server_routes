const express = require('express');
const app = express();
const port = 3001;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const animalRoutes = require('./routes/animalRoutes');
app.use('/animal', animalRoutes); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
  res.status(404).send(`Cannot ${req.method} ${req.path}`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
