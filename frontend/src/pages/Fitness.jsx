import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FitnessChart from "../components/FitnessChart";


import {
  createExercise,
  getExercises,
  deleteExercise,
} from "../services/exerciseService";

export default function Fitness() {
  const [workouts, setWorkouts] = useState([]);

  const [form, setForm] = useState({
    exerciseType: "",
    duration: "",
    distance: "",
    caloriesBurned: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] =
    useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      setPageLoading(true);

      const data = await getExercises();

      setWorkouts(data);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load workout history."
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

    if (
      !form.exerciseType.trim() ||
      !form.duration ||
      !form.caloriesBurned
    ) {
      setError(
        "Exercise Type, Duration and Calories Burned are required."
      );
      return;
    }

    if (
      Number(form.duration) <= 0
    ) {
      setError(
        "Duration must be greater than 0."
      );
      return;
    }

    if (
      Number(form.caloriesBurned) <= 0
    ) {
      setError(
        "Calories burned must be greater than 0."
      );
      return;
    }

    try {
      setLoading(true);

      await createExercise({
        exerciseType:
          form.exerciseType,
        duration: Number(
          form.duration
        ),
        distance: Number(
          form.distance || 0
        ),
        caloriesBurned: Number(
          form.caloriesBurned
        ),
      });

      setSuccess(
        "Workout saved successfully."
      );

      setForm({
        exerciseType: "",
        duration: "",
        distance: "",
        caloriesBurned: "",
      });

      await loadWorkouts();
    } catch (err) {
      console.error(err);

      setError(
        "Failed to save workout."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this workout?"
      );

    if (!confirmDelete) return;

    try {
      clearMessages();

      await deleteExercise(id);

      setSuccess(
        "Workout deleted successfully."
      );

      loadWorkouts();
    } catch (err) {
      console.error(err);

      setError(
        "Failed to delete workout."
      );
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">

          {/* Header */}

          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              Fitness Tracking
            </h1>

            <p className="text-gray-500 mt-1">
              Track workouts and
              calories burned
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

          {/* Form */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Add Workout
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block mb-2 font-medium">
                  Exercise Type *
                </label>

                <input
                  type="text"
                  placeholder="Running"
                  value={
                    form.exerciseType
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      exerciseType:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Duration (mins) *
                </label>

                <input
                  type="number"
                  placeholder="30"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duration:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Distance (km)
                </label>

                <input
                  type="number"
                  placeholder="5"
                  value={form.distance}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      distance:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Calories Burned *
                </label>

                <input
                  type="number"
                  placeholder="300"
                  value={
                    form.caloriesBurned
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      caloriesBurned:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
                >
                  {loading
                    ? "Saving..."
                    : "Save Workout"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow p-6 mt-6 ">

            <h2 className="text-xl font-bold mb-5">
              Fitness Progress
            </h2>
            <div className="w-48 h-48">
              {workouts.length > 0 ? (
                <FitnessChart
                  workouts={workouts}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Add workout to view
                  fitness chart.
                </div>
              )} </div>
          </div>

          {/* Workout History */}

          <div className="bg-white rounded-xl shadow p-6 mt-6">

            <h2 className="text-xl font-bold mb-5">
              Workout History
            </h2>

            {pageLoading ? (
              <div className="text-center py-10">
                Loading workouts...
              </div>
            ) : workouts.length ===
              0 ? (
              <div className="text-center py-10 text-gray-500">
                No workouts added
                yet.
              </div>
            ) : (
              <div className="space-y-4">
                {workouts.map(
                  (workout) => (
                    <div
                      key={
                        workout._id
                      }
                      className="border rounded-xl p-5 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-bold">
                          {
                            workout.exerciseType
                          }
                        </h3>

                        <div className="mt-2 text-gray-600 space-y-1">
                          <p>
                            Duration:
                            {" "}
                            {
                              workout.duration
                            }
                            {" "}
                            mins
                          </p>

                          <p>
                            Distance:
                            {" "}
                            {workout.distance ||
                              0}
                            {" "}
                            km
                          </p>

                          <p>
                            Calories:
                            {" "}
                            {
                              workout.caloriesBurned
                            }
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          handleDelete(
                            workout._id
                          )
                        }
                        className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}