import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const {
    name,
    subtitle,
    icon,
    gradient,
    bgGradient,
    borderColor,
    features,
    pricing,
    badge,
    popular,
    instant,
  } = body;

  try {
    const session = await getServerSession(authOptions);


    if (
      !session ||
      (session.user.role !== Role.ADMIN &&
        session.user.role !== Role.SUPER_ADMIN)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
      !name ||
      !subtitle ||
      !icon ||
      !gradient ||
      !bgGradient ||
      !borderColor ||
      !features ||
      !pricing ||
      !badge
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const packageData = await prisma.package.create({
      data: {
        name,
        subtitle,
        icon,
        gradient,
        bgGradient,
        borderColor,
        features,
        badge,
        popular: Boolean(popular),
        instant: Boolean(instant),
        pricing: {
          create: {
            setup: pricing.setup,
            messaging: pricing.messaging,
            note: pricing.note,
          },
        },
      },
      include: {
        pricing: true,
      },
    });

    return NextResponse.json(packageData, { status: 201 });
  } catch (e) {
    console.error("Error creating package:", e);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  try {
    const data = await prisma.package.findMany({
      include: {
        pricing: true,
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
