import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

interface IProps {
  sales: number[];
  expenses: number[];
  credits: number[];
  labels: string[];
}

export const MultiLineGraph: React.FC<IProps> = ({
  labels,
  sales,
  credits,
  expenses,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: `Sales Revenue Trends`,
              data: sales,
              fill: false,
              borderColor: "#66cccc",
              tension: 0.1,
            },
            {
              label: `Expenditure Trends`,
              data: expenses,
              fill: false,
              borderColor: "#cc6666",
              tension: 0.1,
            },
            {
              label: `Credit Trends`,
              data: credits,
              fill: false,
              borderColor: "#99cc66",
              tension: 0.1,
            },
          ],
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, []);

  return <canvas ref={chartRef} />;
};
