import { connectToDatabase } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET() {
  await connectToDatabase();
  const transactions = await Transaction.find().sort({ date: -1 });
  return Response.json(transactions); // ✅ this is correct
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { amount, description, date, category } = body;

    // ✅ Validation
    if (!amount || !description || !date || !category) {
      return Response.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    if (isNaN(amount) || amount <= 0) {
      return Response.json(
        { success: false, error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    await Transaction.create({ amount, description, date, category });

    return Response.json(
      { success: true, message: "Transaction created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating transaction:", error);
    return Response.json(
      { success: false, error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
