import { connectToDatabase } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET() {
  await connectToDatabase();
  const transactions = await Transaction.find().sort({ date: -1 });
  return Response.json(transactions);
}

export async function POST(req) {
  const body = await req.json();
  await connectToDatabase();
  const newTransaction = await Transaction.create(body);
  return Response.json(newTransaction);
}
