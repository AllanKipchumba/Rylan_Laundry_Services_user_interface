import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

interface IProps {
  sales: number[];
  expenses: number[];
  credits: number[];
  labels: string[];
  totalSales: number;
  totalExpenses: number;
  totalCredits: number;
  year: number;
}

export const MultiLineGraph: React.FC<IProps> = ({
  labels,
  sales,
  credits,
  expenses,
  totalSales,
  totalExpenses,
  totalCredits,
  year,
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
              label: [
                `${year} Sales Revenue Trends`,
                `Total sales: ${totalSales}`,
              ].join(" "),
              data: sales,
              fill: false,
              borderColor: "#66cccc",
              tension: 0.1,
            },
            // {
            //   label: [
            //     `${year} Expenditure Trends`,
            //     `Total expenses: ${totalExpenses}`,
            //   ].join(" "),
            //   data: expenses,
            //   fill: false,
            //   borderColor: "#cc6666",
            //   tension: 0.1,
            // },
            // {
            //   label: [
            //     `${year} Credit Trends`,
            //     `Total credits: ${totalCredits}`,
            //   ].join(" "),
            //   data: credits,
            //   fill: false,
            //   borderColor: "#99cc66",
            //   tension: 0.1,
            // },
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
