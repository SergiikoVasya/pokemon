import axios from "axios";

const getData = async (offset, limit) => {
  const req = await axios({
    method: "GET",
    url: "https://pokeapi.co/api/v2/pokemon",
    params: {
      offset: offset || 0,
      limit: limit || 20,
    },
  });
  return req.data;
};

const getPokemon = async (url) => {
  const req = await axios({
    method: "GET",
    url: url,
  });
  return req.data;
};

export default {
  getData,
  getPokemon,
};
