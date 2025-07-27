import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export const GET = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "USER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
