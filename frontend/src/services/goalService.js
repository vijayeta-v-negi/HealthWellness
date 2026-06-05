import API from "./api";

export const getGoals = async () => {
  const res = await API.get(
    "/goals"
  );

  return res.data;
};

export const createGoal =
  async (goalData) => {
    const res =
      await API.post(
        "/goals",
        goalData
      );

    return res.data;
  };

export const deleteGoal =
  async (id) => {
    const res =
      await API.delete(
        `/goals/${id}`
      );

    return res.data;
  };