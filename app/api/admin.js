import client from "./client";

const usersEndpoint = "/users";
const citiesEndpoint = "/cities";

const getUsers = () => client.get(usersEndpoint, { sort: "name" });
const createUser = (data) => client.post(usersEndpoint, data);
const updateUser = (userId, data) => {
  return client.put(`${usersEndpoint}/${userId}`, data);
};

const deleteUser = (id) => client.delete(`${usersEndpoint}/${id}`);

const getCities = () => client.get(citiesEndpoint);
const createCity = (data) => client.post(citiesEndpoint, data);
const getCity = (id) => client.get(`${citiesEndpoint} / ${id}`);
const deleteCity = (id) => client.delete(`${citiesEndpoint}/${id}`);
const updateCity = (cityID, data) => {
  return client.put(`${citiesEndpoint}/${cityID}`, data);
};

export default {
  getUsers,
  getCity,
  deleteCity,
  getCities,
  updateUser,
  deleteUser,
  createUser,
  updateCity,
  createCity,
};
