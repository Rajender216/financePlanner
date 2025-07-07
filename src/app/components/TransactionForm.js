"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function TransactionForm({ refresh }) {
  const [form, setForm] = useState({ amount: "", description: "", date: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Transaction added!");
      setForm({ amount: "", description: "", date: "" });
      refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
      <Input
        placeholder="Amount"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />
      <Input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <Input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
