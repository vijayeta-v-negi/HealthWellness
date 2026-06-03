import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import GoalChart from "../components/GoalChart";

import {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
} from "../services/goalService";

export default function Goals() {
  const [goals, setGoals] = useState([]);

  const [form, setForm] = useState({
    goalType: "",
    targetValue: "",
    currentValue: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] =
    useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setPageLoading(true);

      const data = await getGoals();

      setGoals(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearMessages();

    if (!form.goalType.trim()) {
      setError(
        "Goal type is required."
      );
      return;
    }

    if (!form.targetValue) {
      setError(
        "Target value is required."
      );
      return;
    }

    if (
      Number(form.targetValue) <= 0
    ) {
      setError(
        "Target value must be greater than 0."
      );
      return;
    }

    try {
      setLoading(true);

      await createGoal({
        goalType: form.goalType,
        targetValue: Number(
          form.targetValue
        ),
        currentValue: Number(
          form.currentValue || 0
        ),
      });

      setSuccess(
        "Goal created successfully."
      );

      setForm({
        goalType: "",
        targetValue: "",
        currentValue: "",
      });

      await loadGoals();
    } catch (err) {
      console.error(err);

      setError(
        "Failed to create goal."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this goal?"
      );

    if (!confirmDelete) return;

    try {
      clearMessages();

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

  const updateProgress = async (
    goal
  ) => {
    const newValue =
      prompt(
        `Update progress for ${goal.goalType}`,
        goal.currentValue
      );

    if (
      newValue === null ||
      newValue === ""
    )
      return;

    try {
      await updateGoal(
        goal._id,
        {
          currentValue:
            Number(newValue),
        }
      );

      setSuccess(
        "Goal progress updated."
      );

      loadGoals();
    } catch (err) {
      console.error(err);

      setError(
        "Failed to update progress."
      );
    }
  };

  const overallProgress =
    goals.length > 0
      ? Math.round(
        goals.reduce(
          (sum, goal) =>
            sum +
            (goal.currentValue /
              goal.targetValue) *
            100,
          0
        ) / goals.length
      )
      : 0;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">

          {/* Header */}

          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              Goal Tracking
            </h1>

            <p className="text-gray-500 mt-1">
              Create and monitor
              your health goals
            </p>
          </div>

          {/* Summary */}

          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-600">
              Overall Goal Completion
            </h2>

            <p className="text-4xl font-bold text-purple-600 mt-2">
              {overallProgress}%
            </p>
          </div>

          {/* Alerts */}

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

          {/* Goal Form */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Create New Goal
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block mb-2 font-medium">
                  Goal Type *
                </label>

                <input
                  type="text"
                  placeholder="Daily Steps"
                  value={form.goalType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      goalType:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Target Value *
                </label>

                <input
                  type="number"
                  placeholder="10000"
                  value={
                    form.targetValue
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      targetValue:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Current Value
                </label>

                <input
                  type="number"
                  placeholder="0"
                  value={
                    form.currentValue
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      currentValue:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
                >
                  {loading
                    ? "Saving..."
                    : "Create Goal"}
                </button>
              </div>
            </form>
          </div>

          {/* Goal Chart */}

          <div className="bg-white rounded-xl shadow p-6 mt-6">

            <h2 className="text-xl font-bold mb-5">
              Goal Analytics
            </h2>
            <div className="w-48 h-48">
              {goals.length > 0 ? (
                <GoalChart goals={goals} />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Add goals to view
                  analytics.
                </div>
              )}
            </div>
          </div>

          {/* Goals List */}

          <div className="bg-white rounded-xl shadow p-6 mt-6">

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
                No goals created
                yet.
              </div>
            ) : (
              <div className="space-y-5">
                {goals.map((goal) => {
                  const progress =
                    Math.min(
                      (
                        (goal.currentValue /
                          goal.targetValue) *
                        100
                      ).toFixed(1),
                      100
                    );

                  return (
                    <div
                      key={goal._id}
                      className="border rounded-xl p-5 bg-gray-50"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                        <div>
                          <h3 className="text-lg font-bold">
                            {
                              goal.goalType
                            }
                          </h3>

                          <p className="text-gray-600 mt-1">
                            Target:
                            {" "}
                            {
                              goal.targetValue
                            }
                          </p>

                          <p className="text-gray-600">
                            Current:
                            {" "}
                            {
                              goal.currentValue
                            }
                          </p>

                          <p className="font-medium text-purple-600 mt-2">
                            {progress}%
                            Complete
                          </p>
                        </div>

                        <div className="flex gap-3 mt-4 md:mt-0">
                          <button
                            onClick={() =>
                              updateProgress(
                                goal
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                          >
                            Update
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

                      {/* Progress Bar */}

                      <div className="w-full bg-gray-200 h-4 rounded-full mt-4 overflow-hidden">

                        <div
                          className="bg-purple-600 h-4 rounded-full"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}