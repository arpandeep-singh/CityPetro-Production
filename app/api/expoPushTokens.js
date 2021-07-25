import client from "./client";

const register = (pushToken) =>
  client.post("/auth/push-token", { token: pushToken });

const removePushToken = (pushToken) => {
  client.delete("/auth/push-token", { token: pushToken });
};

export default {
  register,
  removePushToken,
};
