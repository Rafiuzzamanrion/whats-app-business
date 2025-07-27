"use client";
import React from "react";
import { Spinner } from "@heroui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Badge } from "@heroui/badge";
import { Avatar } from "@heroui/avatar";
import { Divider } from "@heroui/divider";
import {
  ShoppingCart,
  CreditCard,
  Phone,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  X,
  AlertTriangle,
  Package,
  Truck,
  User,
  TrendingUp,
  Activity,
  Heart,
  Gift,
} from "lucide-react";

import { useAuth } from "@/app/hooks/use-auth";

interface UserItem {
  userId: string;
  id: string;
  name: string;
  email: string;
  activeWhatsappNumber: string;
  paymentMethod: string;
  file: string;
  productId: string;
  productName: string;
  status: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

type ChipColor =
  | "success"
  | "default"
  | "primary"
  | "secondary"
  | "warning"
  | "danger";

const statusColorMap: Record<string, ChipColor> = {
  completed: "success",
  delivered: "success",
  pending: "warning",
  processing: "primary",
  shipped: "primary",
  cancelled: "danger",
  refunded: "secondary",
};

const statusIconMap: Record<string, any> = {
  completed: CheckCircle,
  delivered: Package,
  pending: Clock,
  processing: Activity,
  shipped: Truck,
  cancelled: X,
  refunded: AlertTriangle,
};

const paymentMethodColorMap: Record<string, ChipColor> = {
  "credit card": "primary",
  "debit card": "secondary",
  paypal: "warning",
  "bank transfer": "success",
  cash: "default",
};

const Page = () => {
  const [data, setData] = React.useState<UserItem[]>([]);
  const [isPending, startTransition] = React.useTransition();
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      startTransition(async () => {
        const response = await fetch("/api/dashboard");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        setData(data);
        console.log("Fetched data:", data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getTotalOrders = () => data?.length || 0;
  const getTotalSpent = () =>
    data?.reduce((sum, item) => sum + item.totalPrice, 0) || 0;
  const getCompletedOrders = () =>
    data?.filter(
      (item) => item.status === "completed" || item.status === "delivered",
    ).length || 0;
  const getPendingOrders = () =>
    data?.filter(
      (item) => item.status === "pending" || item.status === "processing",
    ).length || 0;

  const getStatusColor = (status: string): ChipColor => {
    return statusColorMap[status.toLowerCase()] || "default";
  };

  const getPaymentColor = (paymentMethod: string): ChipColor => {
    return paymentMethodColorMap[paymentMethod?.toLowerCase()] || "default";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* User Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar
              className="border-4 border-white shadow-lg"
              fallback={
                <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-xl">
                  <User className="h-8 w-8" />
                </div>
              }
              size="lg"
              src={"/placeholder-avatar.jpg"}
            />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                My Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Welcome back, {user?.name || user?.email}!
              </p>
            </div>
          </div>

          {/* User Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-violet-400 to-purple-500 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-violet-100 text-sm font-medium">
                      My Orders
                    </p>
                    <p className="text-3xl font-bold">{getTotalOrders()}</p>
                    <p className="text-violet-200 text-xs mt-1">
                      Total purchases
                    </p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">
                      Total Spent
                    </p>
                    <p className="text-3xl font-bold">
                      {formatCurrency(getTotalSpent())}
                    </p>
                    <p className="text-emerald-200 text-xs mt-1">
                      Lifetime spending
                    </p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <DollarSign className="h-8 w-8" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      Completed
                    </p>
                    <p className="text-3xl font-bold">{getCompletedOrders()}</p>
                    <p className="text-blue-200 text-xs mt-1">
                      Successful orders
                    </p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100 text-sm font-medium">
                      Pending
                    </p>
                    <p className="text-3xl font-bold">{getPendingOrders()}</p>
                    <p className="text-amber-200 text-xs mt-1">In progress</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Clock className="h-8 w-8" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* My Orders Table */}
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  My Order History
                </h2>
              </div>
              <Chip
                color="primary"
                startContent={<Calendar className="h-4 w-4" />}
                variant="flat"
              >
                {getTotalOrders()} Orders
              </Chip>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="p-0">
            {isPending ? (
              <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center gap-4">
                  <Spinner color="primary" size="lg" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Loading your orders...
                  </p>
                </div>
              </div>
            ) : data?.length > 0 ? (
              <Table
                aria-label="My order history table"
                classNames={{
                  wrapper: "shadow-none bg-transparent",
                  th: "bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 font-semibold",
                  td: "py-4",
                  tr: "hover:bg-violet-50/50 dark:hover:bg-gray-700/30 transition-colors duration-200",
                }}
              >
                <TableHeader>
                  <TableColumn>ORDER INFO</TableColumn>
                  <TableColumn>PRODUCT</TableColumn>
                  <TableColumn>DELIVERY</TableColumn>
                  <TableColumn>PAYMENT</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                  {data.map((order: UserItem) => {
                    const StatusIcon =
                      statusIconMap[order.status.toLowerCase()] || Clock;

                    return (
                      <TableRow key={order.id} className="animate-fadeIn">
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                              <Badge
                                color="primary"
                                content={order.quantity}
                                size="sm"
                              >
                                <div className="w-10 h-10 bg-gradient-to-r from-violet-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                                  <span className="text-white text-sm font-bold">
                                    #{order.id.slice(-4)}
                                  </span>
                                </div>
                              </Badge>
                              <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                  Order #{order.id.slice(-8).toUpperCase()}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(order.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar
                              className="border-2 border-violet-200 dark:border-gray-600 shadow-sm"
                              fallback={
                                <div className="bg-gradient-to-r from-violet-400 to-purple-500 text-white font-bold flex items-center justify-center">
                                  <Package className="h-5 w-5" />
                                </div>
                              }
                              name={order.productName}
                              size="md"
                              src={order.file || "/placeholder-product.jpg"}
                            />
                            <div>
                              <p className="font-medium text-gray-800 dark:text-gray-200">
                                {order.productName}
                              </p>
                              <div className="flex items-center gap-2">
                                <Chip
                                  color="secondary"
                                  size="sm"
                                  startContent={
                                    <TrendingUp className="h-3 w-3" />
                                  }
                                  variant="flat"
                                >
                                  Qty: {order.quantity}
                                </Chip>
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <p className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1">
                              <User className="h-3 w-3 text-violet-500" />
                              {order.name}
                            </p>
                            {order.activeWhatsappNumber && (
                              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="h-3 w-3 text-green-500" />
                                <span>{order.activeWhatsappNumber}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {formatCurrency(order.totalPrice)}
                            </p>
                            <Chip
                              color={getPaymentColor(order.paymentMethod)}
                              size="sm"
                              startContent={<CreditCard className="h-3 w-3" />}
                              variant="flat"
                            >
                              {order.paymentMethod}
                            </Chip>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Chip
                            className="capitalize font-medium"
                            color={getStatusColor(order.status)}
                            startContent={<StatusIcon className="h-4 w-4" />}
                            variant="flat"
                          >
                            {order.status}
                          </Chip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="p-4 bg-violet-100 dark:bg-gray-700 rounded-full mb-4">
                  <ShoppingCart className="h-16 w-16 text-violet-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-700 dark:text-gray-300">
                  No orders yet
                </h3>
                <p className="text-sm text-center max-w-sm">
                  Start shopping to see your order history here. We have amazing
                  products waiting for you!
                </p>
                <Button
                  className="mt-4 bg-gradient-to-r from-violet-500 to-purple-600"
                  color="primary"
                  startContent={<Heart className="h-4 w-4" />}
                >
                  Start Shopping
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </main>
    </div>
  );
};

export default Page;
