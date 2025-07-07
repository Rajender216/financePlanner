"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function TransactionList({ refresh }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, [refresh]);

  const deleteTx = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    toast.success("Transaction deleted");
  };

  return (
    <div className="mt-6 space-y-3">
      {transactions.map((tx) => (
        <div key={tx._id} className="p-3 border rounded shadow-sm flex justify-between">
          <div>
            <p className="font-semibold">₹{tx.amount}</p>
            <p>{tx.description}</p>
            <p className="text-sm text-gray-500">{new Date(tx.date).toDateString()}</p>
          </div>
          <Button onClick={() => deleteTx(tx._id)} variant="destructive">
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
