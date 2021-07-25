import client from "./client";

const endpoint = "/stations";
const getSites = (...args) => client.get(endpoint, ...args);

const addStation = (stationId, cityId) => {
  const data = {
    stationId: stationId,
    city: cityId,
  };
  return client.post(endpoint, data);
};

const deleteStation = (id) => client.delete(`${endpoint}/${id}`);

export default {
  getSites,
  addStation,
  deleteStation,
};
