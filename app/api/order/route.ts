import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (
      !body.name ||
      !body.email ||
      !body.activeWhatsappNumber ||
      !body.paymentMethod ||
      !body.file ||
      !body.productId // Add this check
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const order = await prisma.order.create({
      data: {
        name: body.name,
        email: body.email,
        activeWhatsappNumber: body.activeWhatsappNumber,
        paymentMethod: body.paymentMethod,
        file: body.file,
        status: "pending",
        productId: body.productId,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (e) {
    console.error("Error creating order:", e);

    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
