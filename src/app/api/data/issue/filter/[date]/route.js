import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ConnectMongoDb from "@/lib/mongoConnect";
import IssueModel from "@/lib/models/issue";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  console.log("params", params);
  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", token);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" });
  }
  try {
    await ConnectMongoDb();

    const { date } = params;
    const issues = await IssueModel.find({
      createdAt: {
        $gte: new Date(date),
      },
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      issues,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
