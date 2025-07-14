import { getServerSession } from "next-auth/next";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPER_ADMIN)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { title, description, file } = body;

  if (!title || !description || !file) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const businessData = await prisma.businessApi.create({
      data: {
        title,
        description,
        file,
      },
    });

    return NextResponse.json(
      {
        message: "Business API created successfully",
        businessData,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating business API:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  try {
    const businessApis = await prisma.businessApi.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(businessApis);
  } catch (error) {
    console.error("Error fetching business APIs:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const DELETE = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPER_ADMIN)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const deletedBusinessApi = await prisma.businessApi.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Business API deleted successfully",
        deletedBusinessApi,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting business API:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
