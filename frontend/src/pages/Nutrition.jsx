import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NutritionChart from "../components/NutritionChart";

import {
  getNutrition,
  createNutrition,
  deleteNutrition,
} from "../services/nutritionService";

export default function Nutrition() {
  const [foods, setFoods] = useState([]);

  const [form, setForm] = useState({
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] =
    useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    try {
      setPageLoading(true);

      const data = await getNutrition();

      setFoods(data);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load nutrition records."
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

    if (!form.foodName.trim()) {
      setError(
        "Food name is required."
      );
      return;
    }

    if (!form.calories) {
      setError(
        "Calories field is required."
      );
      return;
    }

    if (
      Number(form.calories) <= 0
    ) {
      setError(
        "Calories must be greater than 0."
      );
      return;
    }

    try {
      setLoading(true);

      await createNutrition({
        foodName: form.foodName,
        calories: Number(
          form.calories
        ),
        protein: Number(
          form.protein || 0
        ),
        carbs: Number(
          form.carbs || 0
        ),
        fats: Number(
          form.fats || 0
        ),
      });

      setSuccess(
        "Meal added successfully."
      );

      setForm({
        foodName: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
      });

      await loadFoods();
    } catch (err) {
      console.error(err);

      setError(
        "Failed to save meal."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this meal?"
      );

    if (!confirmDelete) return;

    try {
      clearMessages();

      await deleteNutrition(id);

      setSuccess(
        "Meal deleted successfully."
      );

      loadFoods();
    } catch (err) {
      console.error(err);

      setError(
        "Failed to delete meal."
      );
    }
  };

  const totalCalories =
    foods.reduce(
      (sum, item) =>
        sum +
        Number(item.calories || 0),
      0
    );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">

          {/* Header */}

          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              Nutrition Tracker
            </h1>

            <p className="text-gray-500 mt-1">
              Monitor your meals and
              nutritional intake
            </p>
          </div>

          {/* Summary Card */}

          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-600">
              Total Calories Consumed
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-2">
              {totalCalories}
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
              Add Meal
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block mb-2 font-medium">
                  Food Name *
                </label>

                <input
                  type="text"
                  placeholder="Chicken Salad"
                  value={form.foodName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      foodName:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Calories *
                </label>

                <input
                  type="number"
                  placeholder="350"
                  value={form.calories}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      calories:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Protein (g)
                </label>

                <input
                  type="number"
                  placeholder="25"
                  value={form.protein}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      protein:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Carbs (g)
                </label>

                <input
                  type="number"
                  placeholder="40"
                  value={form.carbs}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      carbs:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Fats (g)
                </label>

                <input
                  type="number"
                  placeholder="10"
                  value={form.fats}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fats:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
                >
                  {loading
                    ? "Saving..."
                    : "Save Meal"}
                </button>
              </div>
            </form>
          </div>

          {/* Nutrition Chart */}

          <div className="bg-white rounded-xl shadow p-6 mt-6 ">

            <h2 className="text-xl font-bold mb-5">
              Nutrition Breakdown
            </h2>
            <div className="w-48 h-48">
              {foods.length > 0 ? (
                <NutritionChart
                  foods={foods}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Add meals to view
                  nutrition chart.
                </div>
              )} </div>
          </div>

          {/* Meal History */}

          <div className="bg-white rounded-xl shadow p-6 mt-6">

            <h2 className="text-xl font-bold mb-5">
              Meal History
            </h2>

            {pageLoading ? (
              <div className="text-center py-10">
                Loading meals...
              </div>
            ) : foods.length ===
              0 ? (
              <div className="text-center py-10 text-gray-500">
                No meals added yet.
              </div>
            ) : (
              <div className="space-y-4">
                {foods.map((food) => (
                  <div
                    key={food._id}
                    className="border rounded-xl p-5 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold">
                        {food.foodName}
                      </h3>

                      <div className="mt-2 text-gray-600 space-y-1">
                        <p>
                          Calories:
                          {" "}
                          {
                            food.calories
                          }
                        </p>

                        <p>
                          Protein:
                          {" "}
                          {
                            food.protein
                          }
                          g
                        </p>

                        <p>
                          Carbs:
                          {" "}
                          {food.carbs}g
                        </p>

                        <p>
                          Fats:
                          {" "}
                          {food.fats}g
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleDelete(
                          food._id
                        )
                      }
                      className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}