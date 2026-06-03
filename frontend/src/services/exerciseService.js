import API from "./api";

// Get all exercises
export const getExercises = async () => {
  const response = await API.get("/exercises");
  return response.data;
};

// Create exercise
export const createExercise = async (
  exerciseData
) => {
  const response = await API.post(
    "/exercises",
    exerciseData
  );

  return response.data;
};

// Delete exercise
export const deleteExercise = async (id) => {
  const response = await API.delete(
    `/exercises/${id}`
  );

  return response.data;
};