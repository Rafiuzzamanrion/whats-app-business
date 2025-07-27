import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Creating order with body:", body);
    if (
      !body.name ||
      !body.email ||
      !body.activeWhatsappNumber ||
      !body.paymentMethod ||
      !body.file ||
      !body.productId ||
      !body.productName ||
      !body.quantity ||
      !body.totalPrice
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    let userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }
    const order = await prisma.order.create({
      data: {
        userId: userId,
        name: body.name,
        email: body.email,
        activeWhatsappNumber: body.activeWhatsappNumber,
        paymentMethod: body.paymentMethod,
        file: body.file,
        status: "pending",
        quantity: body.quantity,
        totalPrice: body.totalPrice,
        productId: body.productId,
        productName: body.productName,
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

interface OrderCreateRequest {
  name: string;
  email: string;
  activeWhatsappNumber: string;
  paymentMethod: string;
  file?: string;
  productId: string;
  quantity: number;
  totalPrice: number;
}

interface OrderQueryParams {
  page?: string;
  limit?: string;
  status?: string;
  paymentMethod?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// GET /api/orders - Get all orders with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params: OrderQueryParams = {
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "10",
      status: searchParams.get("status") || undefined,
      paymentMethod: searchParams.get("paymentMethod") || undefined,
      search: searchParams.get("search") || undefined,
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    };

    const page = parseInt(params.page as string);
    const limit = parseInt(params.limit as string);
    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const whereClause: any = {};

    if (params.status && params.status !== "all") {
      whereClause.status = params.status;
    }

    if (params.paymentMethod && params.paymentMethod !== "all") {
      whereClause.paymentMethod = params.paymentMethod;
    }

    if (params.search) {
      whereClause.OR = [
        { name: { contains: params.search, mode: "insensitive" } },
        { email: { contains: params.search, mode: "insensitive" } },
        { id: { contains: params.search, mode: "insensitive" } },
      ];
    }

    // Get orders with pagination
    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: {
          [params.sortBy as string]: params.sortOrder,
        },
      }),
      prisma.order.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    const response: ApiResponse = {
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching orders:", error);
    const response: ApiResponse = {
      success: false,
      message: "Failed to fetch orders",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
