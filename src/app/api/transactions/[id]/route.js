import { connectToDatabase } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const {id} = await params;
  await Transaction.findByIdAndDelete(id);
  return Response.json({ success: true });
}

export async function PUT(req, { params }) {
  const body = await req.json();
  await connectToDatabase();
  const updated = await Transaction.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return Response.json(updated);
}
