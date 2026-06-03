import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function FitnessChart({
  workouts,
}) {
  const labels = workouts.map((item) =>
    new Date(
      item.createdAt
    ).toLocaleDateString()
  );

  const calories = workouts.map(
    (item) => item.caloriesBurned
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Calories Burned",
        data: calories,
        borderColor: "#2563eb",
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} />;
}