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

  console.log("Received body:", body);
  const { title, description, file, price } = body?.data;

  console.log("Parsed fields:", { title, description, file });

  if (!title || !description || !file || !price) {
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
        price,
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

export const PUT = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPER_ADMIN)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, title, description, file, price } = body?.data;

  if (!id || !title || !description || !file || !price) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const updatedBusinessApi = await prisma.businessApi.update({
      where: { id },
      data: {
        title,
        description,
        file,
        price,
      },
    });

    return NextResponse.json(
      {
        message: "Business API updated successfully",
        updatedBusinessApi,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating business API:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const GET_BY_ID = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPER_ADMIN)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  console.log("Fetching business API by ID:", id);
  if (!id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

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
    console.error("Error fetching business API by ID:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
