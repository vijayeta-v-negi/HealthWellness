import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function GoalChart({
  goals,
}) {
  const labels = goals.map(
    (goal) => goal.goalType
  );

  const progress = goals.map(
    (goal) =>
      (
        (goal.currentValue /
          goal.targetValue) *
        100
      ).toFixed(0)
  );

  const data = {
    labels,
    datasets: [
      {
        label:
          "Goal Completion %",
        data: progress,
      },
    ],
  };

  return <Bar data={data} />;
}