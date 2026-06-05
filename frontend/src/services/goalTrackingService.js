import API from "./api";

export const addTracking =
  async (
    goalId,
    value
  ) => {
    const res =
      await API.post(
        `/goals/${goalId}/track`,
        { value }
      );

    return res.data;
  };

export const getTracking =
  async (goalId) => {
    const res =
      await API.get(
        `/goals/${goalId}/tracking`
      );

    return res.data;
  };