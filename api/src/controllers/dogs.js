const { API_KEY } = process.env;
const axios = require('axios');
const { Dog, Temperament } = require('../db');

const getApiData = async () => {
  const api = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );

  const dogData = await api.data.map(dog => {
    return {
      id: dog.id,
      name: dog.name,
      lifeSpan: dog.life_span,
      temperament: dog.temperament,
      image: dog.image.url,
      height: dog.height.metric,
      weight: dog.weight.metric,
    };
  });
  return dogData;
};

const getDbData = async () => {
  const dogInDB = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  });
  return dogInDB;
};

getAllBreeds = async () => {
  const infoApi = await getApiData();
  const infoDB = await getDbData();
  const allInfo = [...infoApi, ...infoDB];

  return allInfo;
};

module.exports = {
  getAllBreeds,
  getApiData
}