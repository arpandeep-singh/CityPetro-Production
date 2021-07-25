import client from "./client";

const endpoint = "/schedule";
const getSchedule = () => client.get(endpoint);

export default {
  getSchedule,
};
