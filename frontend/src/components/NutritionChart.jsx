import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function NutritionChart({
  foods,
}) {
  const protein = foods.reduce(
    (sum, item) =>
      sum + Number(item.protein),
    0
  );

  const carbs = foods.reduce(
    (sum, item) =>
      sum + Number(item.carbs),
    0
  );

  const fats = foods.reduce(
    (sum, item) =>
      sum + Number(item.fats),
    0
  );

  const data = {
    labels: [
      "Protein",
      "Carbs",
      "Fats",
    ],
    datasets: [
      {
        data: [
          protein,
          carbs,
          fats,
        ],
        backgroundColor: [
        "#3B82F6", // Blue
        "#10B981", // Green
        "#F59E0B", // Orange
      ],
      },
    ],
  };

  return <Pie data={data} />;
}