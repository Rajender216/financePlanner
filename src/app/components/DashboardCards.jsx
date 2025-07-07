"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function DashboardCards({ refresh }) {
  const [summary, setSummary] = useState({ total: 0, latest: null });

  useEffect(() => {
    axios.get("/api/transactions").then((res) => {
      const transactions = res.data || [];
      const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
      const latest = transactions[0] || null;

      setSummary({ total, latest });
    });
  }, [refresh]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-10">
  <Card>
    <CardHeader>
      <CardTitle>Total Expenses</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold text-red-600">₹{summary.total}</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Latest Transaction</CardTitle>
    </CardHeader>
    <CardContent>
      {summary.latest ? (
        <>
          <p>₹{summary.latest.amount} – {summary.latest.description}</p>
          <p className="text-sm text-gray-500">
            {new Date(summary.latest.date).toDateString()}
          </p>
        </>
      ) : (
        <p>No transactions</p>
      )}
    </CardContent>
  </Card>
</div>

  );
}
