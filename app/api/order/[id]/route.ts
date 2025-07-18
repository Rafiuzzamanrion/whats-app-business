import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface OrderUpdateRequest {
  status?: string;
  name?: string;
  email?: string;
  activeWhatsappNumber?: string;
  paymentMethod?: string;
  file?: string;
  productId?: string;
  quantity?: number;
  totalPrice?: number;
}

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body: OrderUpdateRequest = await request.json();

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      const response: ApiResponse = {
        success: false,
        message: "Order not found",
      };

      return NextResponse.json(response, { status: 404 });
    }

    // Validate status if provided
    if (body.status) {
      const validStatuses = [
        "pending",
        "approved",
        "declined",
        "completed",
        "cancelled",
      ];

      if (!validStatuses.includes(body.status)) {
        const response: ApiResponse = {
          success: false,
          message:
            "Invalid status. Valid statuses are: " + validStatuses.join(", "),
        };

        return NextResponse.json(response, { status: 400 });
      }
    }

    // Validate email format if provided
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(body.email)) {
        const response: ApiResponse = {
          success: false,
          message: "Invalid email format",
        };

        return NextResponse.json(response, { status: 400 });
      }
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });

    const response: ApiResponse = {
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating order:", error);
    const response: ApiResponse = {
      success: false,
      message: "Failed to update order",
    };

    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      const response: ApiResponse = {
        success: false,
        message: "Order not found",
      };

      return NextResponse.json(response, { status: 404 });
    }

    // Delete order
    await prisma.order.delete({
      where: { id },
    });

    const response: ApiResponse = {
      success: true,
      message: "Order deleted successfully",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error deleting order:", error);
    const response: ApiResponse = {
      success: false,
      message: "Failed to delete order",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
