"use client";

import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";

export default function HomePage() {
  const [refresh, setRefresh] = useState(0);
  const rerender = () => setRefresh(refresh + 1);

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Personal Finance Tracker</h1>
      <TransactionForm refresh={rerender} />
      <ExpenseChart refresh={refresh} />
      <TransactionList refresh={rerender} />
    </main>
  );
}
