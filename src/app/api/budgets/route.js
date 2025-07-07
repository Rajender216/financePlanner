import { connectToDatabase } from "@/lib/mongodb";
import Budget from "@/models/Budget";

export async function GET() {
  await connectToDatabase();
  const budgets = await Budget.find();
  return Response.json(budgets);
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const { category, amount } = await req.json();

    const existing = await Budget.findOne({ category });
    if (existing) {
      existing.amount = amount;
      await existing.save();
    } else {
      await Budget.create({ category, amount });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
