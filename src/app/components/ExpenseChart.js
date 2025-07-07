"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseChart({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((txs) => {
        const monthly = txs.reduce((acc, tx) => {
          const month = new Date(tx.date).toLocaleString("default", {
            month: "short",
          });
          acc[month] = (acc[month] || 0) + tx.amount;
          return acc;
        }, {});

        const chartData = Object.entries(monthly).map(([month, total]) => ({
          month,
          total,
        }));

        setData(chartData);
      });
  }, [refresh]);

  return (
    <div className="h-64 mt-8">
      <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#1959AC" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
