import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
  category: {
    type: String,
    enum: ["Food", "Travel", "Shopping", "Bills", "Other"], // predefined
    default: "Other"
  }
});

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
