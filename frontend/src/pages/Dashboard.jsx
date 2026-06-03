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
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <div className="flex justify-center items-center h-[80vh]">
            <h2 className="text-2xl font-semibold">
              Loading Dashboard...
            </h2>
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

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Health Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Track your wellness journey
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">
                Calories Burned
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalCaloriesBurned}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">
                Total Workouts
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalWorkouts}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">
                Meals Logged
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalMeals}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">
                Goal Completion
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.goalCompletion}%
              </p>
            </div>

          </div>

          {/* Fitness Chart */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-5">
              Fitness Progress
            </h2>

            {workouts.length > 0 ? (
              <FitnessChart
                workouts={workouts}
              />
            ) : (
              <p className="text-gray-500">
                No workout data available
              </p>
            )}
          </div>

          {/* Nutrition + Goals */}
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
                <p className="text-gray-500">
                  No nutrition data available
                </p>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow">

              <h2 className="text-xl font-bold mb-5">
                Goal Progress
              </h2>

              {goals.length > 0 ? (
                <GoalChart goals={goals} />
              ) : (
                <p className="text-gray-500">
                  No goals available
                </p>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}