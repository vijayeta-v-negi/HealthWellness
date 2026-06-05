import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import FitnessChart from "../components/FitnessChart";
import NutritionChart from "../components/NutritionChart";
import GoalChart from "../components/GoalChart";

import { getDashboard } from "../services/dashboardService";
import { getExercises } from "../services/exerciseService";
import { getNutrition } from "../services/nutritionService";
import { getGoals } from "../services/goalService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCaloriesBurned: 0,
    totalCaloriesConsumed: 0,
    totalWorkouts: 0,
    totalMeals: 0,
    goalCompletion: 0,
  });

  const [workouts, setWorkouts] = useState([]);
  const [foods, setFoods] = useState([]);
  const [goals, setGoals] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [
        dashboardData,
        exerciseData,
        nutritionData,
        goalData,
      ] = await Promise.all([
        getDashboard(),
        getExercises(),
        getNutrition(),
        getGoals(),
      ]);

      setStats(dashboardData);
      setWorkouts(exerciseData);
      setFoods(nutritionData);
      setGoals(goalData);
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <div className="flex justify-center items-center h-[80vh]">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-700">
                Loading Dashboard...
              </h2>
              <p className="text-gray-500 mt-2">
                Fetching your wellness data
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">

          {/* Header */}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Health Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Monitor your fitness,
              nutrition and goals
            </p>
          </div>

          {/* Stats Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">
                Calories Burned
              </h3>

              <p className="text-3xl font-bold text-red-500 mt-2">
                {stats.totalCaloriesBurned}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">
                Calories Consumed
              </h3>

              <p className="text-3xl font-bold text-orange-500 mt-2">
                {stats.totalCaloriesConsumed}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">
                Total Workouts
              </h3>

              <p className="text-3xl font-bold text-blue-500 mt-2">
                {stats.totalWorkouts}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">
                Meals Logged
              </h3>

              <p className="text-3xl font-bold text-green-500 mt-2">
                {stats.totalMeals}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">
                Goal Completion
              </h3>

              <p className="text-3xl font-bold text-purple-500 mt-2">
                {stats.goalCompletion}%
              </p>
            </div>

          </div>

          {/* Fitness Chart */}

          <div className="mt-8 bg-white p-6 rounded-xl shadow">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">
                Fitness Progress
              </h2>
            </div>

            {workouts.length > 0 ? (
              <FitnessChart
                workouts={workouts}
              />
            ) : (
              <div className="text-center py-10 text-gray-500">
                No workout data available
              </div>
            )}
          </div>

          {/* Nutrition & Goals */}

          <div className="grid lg:grid-cols-2 gap-6 mt-8">

            <div className="bg-white p-6 rounded-xl shadow">

              <h2 className="text-xl font-bold mb-5">
                Nutrition Breakdown
              </h2>

              {foods.length > 0 ? (
                <NutritionChart
                  foods={foods}
                />
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No nutrition data available
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow">

              <h2 className="text-xl font-bold mb-5">
                Goal Analytics
              </h2>

              {goals.length > 0 ? (
                <GoalChart
                  goals={goals}
                />
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No goals available
                </div>
              )}
            </div>

          </div>

          {/* Recent Summary */}

          <div className="mt-8 bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Wellness Summary
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-600">
                  Burned
                </h4>

                <p className="text-2xl font-bold mt-2">
                  {stats.totalCaloriesBurned}
                </p>

                <p className="text-sm text-gray-500">
                  Total calories burned
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-600">
                  Nutrition
                </h4>

                <p className="text-2xl font-bold mt-2">
                  {stats.totalMeals}
                </p>

                <p className="text-sm text-gray-500">
                  Meals tracked
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-600">
                  Goals
                </h4>

                <p className="text-2xl font-bold mt-2">
                  {stats.goalCompletion}%
                </p>

                <p className="text-sm text-gray-500">
                  Goal completion rate
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}