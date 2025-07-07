"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

export default function CategoryPieChart({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/transactions").then((res) => {
      const grouped = {};
      res.data.forEach((tx) => {
        grouped[tx.category] = (grouped[tx.category] || 0) + tx.amount;
      });

      const result = Object.entries(grouped).map(([name, value]) => ({
        name,
        value,
      }));

      setData(result);
    });
  }, [refresh]);

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <PieChart width={300} height={300}>
          {/* Pie setup */}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  );
}
