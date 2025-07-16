import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPER_ADMIN)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = params;

  try {
    const businessApi = await prisma.businessApi.findUnique({
      where: { id },
    });

    if (!businessApi) {
      return NextResponse.json(
        { error: "Business API not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(businessApi);
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
