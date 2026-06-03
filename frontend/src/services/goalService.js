import API from "./api";

// Get all goals
export const getGoals = async () => {
  const response = await API.get(
    "/goals"
  );

  return response.data;
};

// Create goal
export const createGoal = async (
  goalData
) => {
  const response = await API.post(
    "/goals",
    goalData
  );

  return response.data;
};

// Update goal progress
export const updateGoal = async (
  id,
  goalData
) => {
  const response = await API.put(
    `/goals/${id}`,
    goalData
  );

  return response.data;
};

// Delete goal
export const deleteGoal = async (id) => {
  const response = await API.delete(
    `/goals/${id}`
  );

  return response.data;
};