"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function TransactionForm({ refresh }) {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/transactions", form);

      toast.success("Transaction added!");
      setForm({ amount: "", description: "", date: "" });
      refresh();
    } catch (error) {
      toast.error("Failed to add transaction");
      console.error("Axios POST error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md mb-10">
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
      <Select
        onValueChange={(value) => setForm({ ...form, category: value })}
        value={form.category}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Travel">Travel</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
          <SelectItem value="Bills">Bills</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Add</Button>
    </form>
  );
}
