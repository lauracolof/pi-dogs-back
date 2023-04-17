const { Router } = require('express');
const { getTemperament } = require('../controllers/temperament');
const { Temperament } = require('../db');

const router = Router();

//* -------- GET /temperamets-------- *//
router.get('/', async (req, res) => {
  const dogTemperament = await getTemperament();
  const allTemperaments = await Temperament.findAll();
  const filterTemperaments = await allTemperaments.map((temp) => temp.name);
  res.status(200).send(filterTemperaments);
});

module.exports = router;

