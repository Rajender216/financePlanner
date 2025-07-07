"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function TransactionList({ refresh }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => {
        console.error("Failed to fetch transactions:", err);
        toast.error("Could not load transactions");
      });
  }, [refresh]);

  const deleteTx = async (id) => {
    try {
      const res = await axios.delete(`/api/transactions/${id}`);

      if (res.data.success) {
        toast.success("Transaction deleted");
        refresh(); // ✅ Refresh the graph and list
      } else {
        toast.error("Failed to delete transaction");
      }
    } catch (err) {
      console.error("Error deleting transaction:", err);
      toast.error("Error deleting transaction");
    }
  };

  return (
    <div className="mt-6 space-y-3">
      {transactions.map((tx) => (
        <div
          key={tx._id}
          className="p-3 border rounded shadow-sm flex justify-between"
        >
          <div>
            <p className="font-semibold">₹{tx.amount}</p>
            <p>{tx.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(tx.date).toDateString()}
            </p>
          </div>
          <Button onClick={() => deleteTx(tx._id)} variant="destructive">
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
