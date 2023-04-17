const { API_KEY } = process.env;
const axios = require('axios');
const { Temperament } = require('../db');

const getTemperament = async () => {
  let api = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );

  let dogTemperament = await api.data.map((temp) => {
    if (temp.temperament) {
      return temp.temperament;
    }
  })
    .join()
    .split(', ');

  let temps = [];

  dogTemperament.map((dt) => {
    // const str = "   foo  ";
    // console.log(str.trim()); // 'foo'
    if (!temps.includes(dt.trim()) && dt) {
      temps.push(dt.trim());
    }
  });

  temps.map(async (dt) => {
    await Temperament.findOrCreate({
      where: {
        name: dt
      }
    })
  })
};

module.exports = {
  getTemperament
}