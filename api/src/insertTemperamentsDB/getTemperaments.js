const { API_KEY } = process.env;
const axios = require('axios');
const { Temperament } = require('../db');


const savedTemperaments = async () => {
  const url = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  //extract data from api and get only temperaments
  const dataUrl = url.data.map((el) => {
    return el.temperament;
  });
  //divide where words, only strings:
  const temperaments = dataUrl.map((el) => {
    if (typeof el === 'string') {
      return el.split(', ')
    }
  });
  //obtein only words from all temperaments, and i delete duplicated
  const noRepeted = Array.from(new Set(temperaments.flat()));
  // filter null
  const tempsFiltered = noRepeted.filter((el) => typeof el === 'string');

  //convert data in obj to bulkCreate
  const dataToArray = tempsFiltered.map((el) => {
    return { name: el };
  });

  const TempsToInsert = await Temperament.bulkCreate(dataToArray);

  return TempsToInsert;

};

module.exports = {
  savedTemperaments
}