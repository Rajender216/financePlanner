"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BudgetVsActualChart({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBudgetVsActual = async () => {
      const [txRes, budgetRes] = await Promise.all([
        axios.get("/api/transactions"),
        axios.get("/api/budgets"),
      ]);

      const txs = txRes.data;
      const budgets = budgetRes.data;

      const categorySpend = {};
      txs.forEach((tx) => {
        categorySpend[tx.category] = (categorySpend[tx.category] || 0) + tx.amount;
      });

      const merged = budgets.map((b) => ({
        category: b.category,
        Budget: b.amount,
        Spent: categorySpend[b.category] || 0,
      }));

      setData(merged);
    };

    fetchBudgetVsActual();
  }, [refresh]);

  return (
    <Card className={"w-full max-w-2xl mx-auto mt-10"}>
      <CardHeader>
        <CardTitle className="text-center">Budget vs Actual</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Budget" fill="#8884d8" />
            <Bar dataKey="Spent" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
