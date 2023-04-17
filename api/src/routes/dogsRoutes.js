const { Router } = require('express');
const { getAllBreeds } = require('../controllers/dogs');
const { Temperament, Dog } = require('../db');

const router = Router();

//* -------- GET /dogs-------- *//
router.get('/', async (req, res) => {
  let totalDogs = await getAllBreeds();

  const { name } = req.query;
  if (name) {
    let dogBreed = await totalDogs.filter(
      (dog) => dog.name.toLowerCase()
        .includes(name.toLowerCase()));
    dogBreed.length
      ? res.status(200).send(dogBreed)
      : res.status(400).send(`Breed not found`)

  } else {
    res.status(200).send(totalDogs);
  }


});

//* -------- GET /dogs/:id -------- *//
router.get('/:id', async (req, res) => {
  const allBreeds = await getAllBreeds();
  const { id } = req.params;
  if (id) {
    let dogId = await allBreeds.filter((dog) => dog.id == id);
    dogId.length
      ? res.status(200).send(dogId)
      : res.status(404).send(`Dog not found`)
  }
});

//* -------- POST /dogs -------- *//
router.post('/', async (req, res) => {
  let { name, minHeight, maxHeight, minWeight, maxWeight, lifeSpan, image, createdAtDb, temperament } = req.body;

  let dogCreated = await Dog.create({
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    lifeSpan,
    createdAtDb
  });

  let temperamentDB = await Temperament.findAll({
    where: {
      name: temperament
    }
  })
  await dogCreated.addTemperament(temperamentDB)
  res.status(200).send(`Dog created!`)
});

module.exports = router;