"use client";

import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import DashboardCards from "./components/DashboardCards";
import CategoryPieChart from "./components/CategoryPieChart";
import BudgetForm from "./components/BudgetForm";
import BudgetVsActualChart from "./components/BudgetVsActualChart";
import Insights from "./components/Insights";

export default function HomePage() {
  const [refresh, setRefresh] = useState(0);
  const triggerRefresh = () => setRefresh((prev) => prev + 1);

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Personal Finance Tracker</h1>
      <TransactionForm refresh={triggerRefresh} />
      <BudgetForm onUpdate={triggerRefresh} />
      <DashboardCards refresh={refresh} />
      <ExpenseChart refresh={refresh} />
      <CategoryPieChart refresh={refresh} />
      <BudgetVsActualChart refresh={refresh} />
      <Insights refresh={refresh} />
      <TransactionList refresh={triggerRefresh} />
    </main>
  );
}
