"use client";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
import { Transactions } from "@/types";

ChartJS.register(ArcElement, Tooltip, Legend);

type TransactionsProps = {
  transactions: Transactions[];
};
export function TransactionSummary({ transactions }: TransactionsProps) {
  const [typeChartData, setTypeChartData] = useState({
    labels: ["Cash", "Electronic"],
    datasets: [
      {
        label: "# of Transactions",
        data: [0, 0],
        backgroundColor: ["rgba(24, 24, 27)", "rgba(54, 162, 235, 0.7)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  });

  const [categoryChartData, setCategoryChartData] = useState({
    labels: ["Withdraw", "Deposit"],
    datasets: [
      {
        label: "# of Transactions",
        data: [0, 0],
        backgroundColor: ["rgba(24, 24, 27)", "rgba(54, 162, 235, 0.7)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  });

  const [amountChartData, setAmountChartData] = useState({
    labels: ["Withdrawals Amount", "Deposits Amount"],
    datasets: [
      {
        label: "Amount",
        data: [0, 0],
        backgroundColor: ["rgba(24, 24, 27)", "rgba(54, 162, 235, 0.7)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const updateTypeChartData = () => {
      const typeCounts = transactions.reduce(
        (acc, transaction) => {
          if (transaction.type === "cash") {
            acc[0]++;
          } else if (transaction.type === "electronic") {
            acc[1]++;
          }
          return acc;
        },
        [0, 0]
      );

      setTypeChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: typeCounts,
          },
        ],
      }));
    };

    const updateCategoryChartData = () => {
      const categoryCounts = transactions.reduce(
        (acc, transaction) => {
          if (transaction.category === "withdraw") {
            acc[0]++;
          } else if (transaction.category === "deposit") {
            acc[1]++;
          }
          return acc;
        },
        [0, 0]
      );

      setCategoryChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: categoryCounts,
          },
        ],
      }));
    };

    const updateAmountChartData = () => {
      const amountData = transactions.reduce(
        (acc, transaction) => {
          if (transaction.category === "withdraw") {
            acc[0] += Number(transaction.amount);
          } else if (transaction.category === "deposit") {
            acc[1] += Number(transaction.amount);
          }
          return acc;
        },
        [0, 0]
      );

      setAmountChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: amountData,
          },
        ],
      }));
    };

    updateTypeChartData();

    updateCategoryChartData();

    updateAmountChartData();
  }, [transactions]);

  return (
    <div className="w-96 h-96 flex flex-row">
      <Pie data={typeChartData} />
      <Doughnut data={categoryChartData} />
      <Pie data={amountChartData} />
    </div>
  );
}
