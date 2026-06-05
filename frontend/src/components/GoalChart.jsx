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
  const data = {
    labels: goals.map(
      (g) => g.goalType
    ),

    datasets: [
      {
        label:
          "Target Value",

        data: goals.map(
          (g) =>
            g.targetValue
        ),
      },
    ],
  };

  return (
    <div className="h-64">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio:
            false,
        }}
      />
    </div>
  );
}