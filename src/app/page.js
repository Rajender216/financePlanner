"use client";
import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import DashboardCards from "./components/DashboardCards";
import CategoryPieChart from "./components/CategoryPieChart";

export default function HomePage() {
  const [refresh, setRefresh] = useState(0);
  const rerender = () => setRefresh((prev) => prev + 1);

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Personal Finance Tracker</h1>
      <TransactionForm refresh={rerender} />
      <DashboardCards refresh={refresh} />
      <ExpenseChart refresh={refresh} />
      <CategoryPieChart refresh={refresh} />
      <TransactionList refresh={rerender} />
    </main>
  );
}
