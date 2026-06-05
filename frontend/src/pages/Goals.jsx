import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import GoalChart from "../components/GoalChart";

import {
  getGoals,
  createGoal,
  deleteGoal,
} from "../services/goalService";

import {
  addTracking,
  getTracking,
} from "../services/goalTrackingService";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [trackingData, setTrackingData] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] =
    useState("");

  const [form, setForm] = useState({
    goalType: "",
    targetValue: "",
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setPageLoading(true);

      const goalData =
        await getGoals();

      setGoals(goalData);

      const trackingMap = {};

      for (const goal of goalData) {
        try {
          const tracking =
            await getTracking(
              goal._id
            );

          trackingMap[goal._id] =
            tracking;
        } catch {
          trackingMap[goal._id] =
            [];
        }
      }

      setTrackingData(
        trackingMap
      );
    } catch (err) {
      console.error(err);

      setError(
        "Failed to load goals."
      );
    } finally {
      setPageLoading(false);
    }
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    clearMessages();

    if (!form.goalType) {
      return setError(
        "Please select a goal type."
      );
    }

    if (
      !form.targetValue ||
      Number(
        form.targetValue
      ) <= 0
    ) {
      return setError(
        "Target value must be greater than 0."
      );
    }

    try {
      setLoading(true);

      await createGoal({
        goalType:
          form.goalType,
        targetValue: Number(
          form.targetValue
        ),
      });

      setSuccess(
        "Goal created successfully."
      );

      setForm({
        goalType: "",
        targetValue: "",
      });

      loadGoals();
    } catch (err) {
      console.error(err);

      setError(
        "Failed to create goal."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete =
    async (id) => {
      if (
        !window.confirm(
          "Delete this goal?"
        )
      )
        return;

      try {
        await deleteGoal(id);

        setSuccess(
          "Goal deleted successfully."
        );

        loadGoals();
      } catch (err) {
        console.error(err);

        setError(
          "Failed to delete goal."
        );
      }
    };

  const handleTrackToday =
    async (goal) => {
      const value = prompt(
        `Enter today's ${goal.goalType}`
      );

      if (
        value === null ||
        value === ""
      )
        return;

      if (
        Number(value) <= 0
      ) {
        return setError(
          "Value must be greater than 0."
        );
      }

      try {
        await addTracking(
          goal._id,
          Number(value)
        );

        setSuccess(
          "Daily progress recorded."
        );

        loadGoals();
      } catch (err) {
        console.error(err);

        setError(
          "Failed to save tracking."
        );
      }
    };

  const calculateProgress =
    (goal) => {
      const entries =
        trackingData[
          goal._id
        ] || [];

      const total =
        entries.reduce(
          (sum, item) =>
            sum + item.value,
          0
        );

      return Math.min(
        (
          (total /
            goal.targetValue) *
          100
        ).toFixed(1),
        100
      );
    };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">

          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              Goal Tracking
            </h1>

            <p className="text-gray-500 mt-1">
              Create and track
              your wellness goals
              daily
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-100 border border-red-300 text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 rounded-lg bg-green-100 border border-green-300 text-green-700">
              {success}
            </div>
          )}

          {/* Create Goal */}

          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-xl font-bold mb-5">
              Create Goal
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              className="grid md:grid-cols-2 gap-4"
            >
              <select
                value={
                  form.goalType
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    goalType:
                      e.target
                        .value,
                  })
                }
                className="border rounded-lg p-3"
              >
                <option value="">
                  Select Goal
                  Type
                </option>

                <option value="Steps">
                  Steps
                </option>

                <option value="Calories Burned">
                  Calories
                  Burned
                </option>

                <option value="Calories Consumed">
                  Calories
                  Consumed
                </option>

                <option value="Water Intake">
                  Water Intake
                </option>

                <option value="Workout Duration">
                  Workout
                  Duration
                </option>
              </select>

              <input
                type="number"
                placeholder="Target Value"
                value={
                  form.targetValue
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    targetValue:
                      e.target
                        .value,
                  })
                }
                className="border rounded-lg p-3"
              />

              <button
                disabled={
                  loading
                }
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg md:col-span-2"
              >
                {loading
                  ? "Creating..."
                  : "Create Goal"}
              </button>
            </form>
          </div>

          {/* Goal Chart */}

          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-xl font-bold mb-5">
              Goal Analytics
            </h2>

            {goals.length >
            0 ? (
              <GoalChart
                goals={
                  goals
                }
              />
            ) : (
              <p className="text-gray-500">
                No goals
                available.
              </p>
            )}
          </div>

          {/* Goals List */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              My Goals
            </h2>

            {pageLoading ? (
              <div className="text-center py-10">
                Loading goals...
              </div>
            ) : goals.length ===
              0 ? (
              <div className="text-center py-10 text-gray-500">
                No goals
                created yet.
              </div>
            ) : (
              <div className="space-y-6">
                {goals.map(
                  (goal) => {
                    const progress =
                      calculateProgress(
                        goal
                      );

                    const entries =
                      trackingData[
                        goal
                          ._id
                      ] || [];

                    return (
                      <div
                        key={
                          goal._id
                        }
                        className="border rounded-xl p-5 bg-gray-50"
                      >
                        <div className="flex flex-col lg:flex-row lg:justify-between">

                          <div>
                            <h3 className="text-lg font-bold">
                              {
                                goal.goalType
                              }
                            </h3>

                            <p className="text-gray-600">
                              Target:
                              {" "}
                              {
                                goal.targetValue
                              }
                            </p>

                            <p className="text-purple-600 font-semibold mt-2">
                              {
                                progress
                              }
                              %
                              Complete
                            </p>
                          </div>

                          <div className="flex gap-3 mt-4 lg:mt-0">

                            <button
                              onClick={() =>
                                handleTrackToday(
                                  goal
                                )
                              }
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                            >
                              Track
                              Today
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  goal._id
                                )
                              }
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                              Delete
                            </button>

                          </div>
                        </div>

                        <div className="w-full bg-gray-200 h-4 rounded-full mt-4 overflow-hidden">

                          <div
                            className="bg-purple-600 h-4 rounded-full"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>

                        {/* Tracking History */}

                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">
                            Recent
                            Tracking
                          </h4>

                          {entries.length ===
                          0 ? (
                            <p className="text-sm text-gray-500">
                              No
                              tracking
                              entries
                              yet.
                            </p>
                          ) : (
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                              {entries
                                .slice()
                                .reverse()
                                .map(
                                  (
                                    item
                                  ) => (
                                    <div
                                      key={
                                        item._id
                                      }
                                      className="flex justify-between text-sm border-b pb-1"
                                    >
                                      <span>
                                        {new Date(
                                          item.date
                                        ).toLocaleDateString()}
                                      </span>

                                      <span className="font-medium">
                                        {
                                          item.value
                                        }
                                      </span>
                                    </div>
                                  )
                                )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}