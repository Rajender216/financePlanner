import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: Number,
    description: String,
    date: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
