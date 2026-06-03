import API from "./api";

// Get all nutrition records
export const getNutrition = async () => {
  const response = await API.get(
    "/nutrition"
  );

  return response.data;
};

// Add food entry
export const createNutrition = async (
  nutritionData
) => {
  const response = await API.post(
    "/nutrition",
    nutritionData
  );

  return response.data;
};

// Delete food entry
export const deleteNutrition = async (
  id
) => {
  const response = await API.delete(
    `/nutrition/${id}`
  );

  return response.data;
};