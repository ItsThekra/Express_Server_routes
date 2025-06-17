
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const validAnimals = ['cat', 'lion', 'panda'];

const imgPath = path.join(__dirname, '..', 'public', 'animal');

router.get('/:name', (req, res) => {
  const { name } = req.params;

  if (validAnimals.includes(name)) {
    const filePath = path.join(imgPath, `${name}.jpg`);
    const imageExists = fs.existsSync(filePath);

    if (imageExists) {
      res.send(`
        <h1>This is a ${name}</h1>
        <img src="/animal/${name}.jpg" width="300" />
        <br><a href="/">← Back</a>
      `);
    } else {
      res.status(404).send('Image file not found.');
    }
  } else {
    res.status(404).send('Unknown animal.');
  }
});

router.all('/:name', (req, res) => {
  res.status(405).send(`${req.method} is not supported on /animal/${req.params.name}`);
});

module.exports = router;