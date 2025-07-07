"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import toast from "react-hot-toast";

export default function BudgetForm({ onUpdate }) {
  const [form, setForm] = useState({ category: "", amount: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/budgets", form);
      toast.success("Budget set!");
      setForm({ category: "", amount: "" });
      onUpdate(); // trigger refresh
    } catch (err) {
      toast.error("Failed to set budget");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mt-10"
    >
      <Select
        value={form.category}
        onValueChange={(val) => setForm({ ...form, category: val })}
      >
        <SelectTrigger className="w-full sm:w-48">
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
      <Input
        type="number"
        placeholder="Monthly Budget"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <Button type="submit">Save</Button>
    </form>
  );
}
