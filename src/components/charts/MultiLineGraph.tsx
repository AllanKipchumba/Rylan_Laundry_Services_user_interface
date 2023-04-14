import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

interface IProps {
  data: number[];
  labels: string[];
  totals: number;
  year: number;
  borderColor: string;
  transactionType: string;
}

export const MultiLineGraph: React.FC<IProps> = ({
  labels,
  data,
  totals,
  year,
  borderColor,
  transactionType,
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
              label: `${year} ${transactionType} Revenue Trends, Total ${transactionType}: ${totals}`,
              data,
              fill: true,
              borderColor,
              tension: 0.1,
              // backgroundColor: borderColor,
            },
          ],
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};
