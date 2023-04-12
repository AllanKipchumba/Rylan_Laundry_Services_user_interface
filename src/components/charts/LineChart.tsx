import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface LineChartProps {
  data: number[];
  labels: string[];
  client?: string;
  year: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  labels,
  client,
  year,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const clientName = client?.charAt(0).toUpperCase() + client!.slice(1);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: `${year} Revenue Trends by ${clientName}`,
              data,
              fill: true,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.3,
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
