"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Insights({ refresh }) {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const getInsights = async () => {
      const [txRes, budgetRes] = await Promise.all([
        axios.get("/api/transactions"),
        axios.get("/api/budgets"),
      ]);

      const txs = txRes.data;
      const budgets = budgetRes.data;
      const spendMap = {};

      txs.forEach((tx) => {
        spendMap[tx.category] = (spendMap[tx.category] || 0) + tx.amount;
      });

      const result = budgets.map((b) => {
        const spent = spendMap[b.category] || 0;
        const diff = b.amount - spent;

        return {
          category: b.category,
          status:
            diff >= 0
              ? `✅ Under budget by ₹${diff}`
              : `⚠️ Over budget by ₹${-diff}`,
        };
      });

      setInsights(result);
    };

    getInsights();
  }, [refresh]);

  return (
    <div className="space-y-2 mt-10">
      <h2 className="text-xl font-semibold">Spending Insights</h2>
      {insights.map((i) => (
        <div key={i.category} className="text-sm border-b py-1">
          <strong>{i.category}:</strong> {i.status}
        </div>
      ))}
    </div>
  );
}
