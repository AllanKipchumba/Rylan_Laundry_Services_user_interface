import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface LineChartProps {
  data: number[];
  labels: string[];
}

export const LineChart: React.FC<LineChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Line Graph",
              data,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data, labels]);

  return <canvas ref={chartRef} />;
};
