"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Calendar,
  User,
  Mail,
  Phone,
  CreditCard,
  Package,
  DollarSign,
  Clock,
  ChevronDown,
  FileText,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Chip,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Pagination,
} from "@heroui/react";
import axios from "axios";
import { toast } from "sonner";
import { Image } from "@heroui/image";

// Type definitions
interface Order {
  userId: string;
  id: string;
  name: string;
  email: string;
  activeWhatsappNumber: string;
  paymentMethod: string;
  file: string;
  productId: string;
  status: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

interface OrderUpdatePayload {
  status: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: Order;
}

interface OrderFilters {
  status: string;
  paymentMethod: string;
  dateRange: string;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<OrderFilters>({
    status: "all",
    paymentMethod: "all",
    dateRange: "all",
  });
  const [updatingOrders, setUpdatingOrders] = useState<Set<string>>(new Set());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: paginationData.limit.toString(),
        ...(filters.status !== "all" && { status: filters.status }),
        ...(filters.paymentMethod !== "all" && {
          paymentMethod: filters.paymentMethod,
        }),
        ...(searchTerm && { search: searchTerm }),
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      const response = await axios.get(`/api/order?${params.toString()}`);

      if (response.data.success) {
        setOrders(response.data.data);
        setPaginationData({
          page: response.data.pagination.page,
          limit: response.data.pagination.limit,
          total: response.data.pagination.total,
          totalPages: response.data.pagination.totalPages,
        });
      } else {
        throw new Error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, filters, searchTerm]);

  const updateOrderStatus = async (
    orderId: string,
    status: string,
  ): Promise<void> => {
    setUpdatingOrders((prev) => new Set(prev).add(orderId));

    try {
      const response = await fetch(`/api/order/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status } as OrderUpdatePayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (result.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, status, updatedAt: new Date().toISOString() }
              : order,
          ),
        );
        toast.success(`Order ${orderId} updated to ${status}`);
      } else {
        throw new Error(result.message || "Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setUpdatingOrders((prev) => {
        const newSet = new Set(prev);

        newSet.delete(orderId);

        return newSet;
      });
    }
  };

  const getStatusColor = (
    status: string,
  ): "default" | "primary" | "secondary" | "success" | "warning" | "danger" => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "declined":
        return "danger";
      default:
        return "default";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filters.status === "all" || order.status === filters.status;
    const matchesPayment =
      filters.paymentMethod === "all" ||
      order.paymentMethod === filters.paymentMethod;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    onOpen();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner color={"success"} size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-success mb-2">
          Order Management
        </h1>
        <p className="text-gray-300">Manage and track all customer orders</p>
      </div>

      {/* Search and Filter Bar */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <Input
              className="max-w-md"
              placeholder="Search orders..."
              startContent={<Search className="h-4 w-4" />}
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <Button
              endContent={
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              }
              variant="bordered"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4">
              <Select
                label="Status"
                placeholder="Select status"
                selectedKeys={[filters.status]}
                onSelectionChange={(keys) =>
                  setFilters({
                    ...filters,
                    status: Array.from(keys)[0] as string,
                  })
                }
              >
                <SelectItem key="all">All Status</SelectItem>
                <SelectItem key="pending">Pending</SelectItem>
                <SelectItem key="approved">Approved</SelectItem>
                <SelectItem key="declined">Declined</SelectItem>
              </Select>

              <Select
                label="Payment Method"
                placeholder="Select payment method"
                selectedKeys={[filters.paymentMethod]}
                onSelectionChange={(keys) =>
                  setFilters({
                    ...filters,
                    paymentMethod: Array.from(keys)[0] as string,
                  })
                }
              >
                <SelectItem key="all">All Methods</SelectItem>
                <SelectItem key="Credit Card">Credit Card</SelectItem>
                <SelectItem key="PayPal">PayPal</SelectItem>
                <SelectItem key="Bank Transfer">Bank Transfer</SelectItem>
              </Select>

              <Select
                label="Date Range"
                placeholder="Select date range"
                selectedKeys={[filters.dateRange]}
                onSelectionChange={(keys) =>
                  setFilters({
                    ...filters,
                    dateRange: Array.from(keys)[0] as string,
                  })
                }
              >
                <SelectItem key="all">All Time</SelectItem>
                <SelectItem key="today">Today</SelectItem>
                <SelectItem key="week">This Week</SelectItem>
                <SelectItem key="month">This Month</SelectItem>
              </Select>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Orders Grid */}
      <div className="grid gap-6">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col md:flex-row lg:flex-row items-center gap-3">
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <Chip
                    color={getStatusColor(order.status)}
                    size="sm"
                    variant="flat"
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Chip>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    startContent={<Eye className="h-4 w-4" />}
                    variant="flat"
                    onClick={() => handleViewOrder(order)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardBody className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{order.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{order.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    {order.activeWhatsappNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{order.paymentMethod}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Qty: {order.quantity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">
                    {formatCurrency(order.totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>Created: {formatDate(order.createdAt)}</span>
                <span>•</span>
                <Clock className="h-3 w-3" />
                <span>Updated: {formatDate(order.updatedAt)}</span>
              </div>
            </CardBody>

            {order.status === "pending" && (
              <CardFooter className="pt-0">
                <div className="flex gap-2 w-full">
                  <Button
                    className="flex-1"
                    color="success"
                    isLoading={updatingOrders.has(order.id)}
                    startContent={
                      !updatingOrders.has(order.id) && (
                        <Check className="h-4 w-4" />
                      )
                    }
                    onClick={() => updateOrderStatus(order.id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    className="flex-1"
                    color="danger"
                    isLoading={updatingOrders.has(order.id)}
                    startContent={
                      !updatingOrders.has(order.id) && <X className="h-4 w-4" />
                    }
                    onClick={() => updateOrderStatus(order.id, "declined")}
                  >
                    Decline
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          showControls
          color="success"
          page={currentPage}
          total={paginationData.totalPages}
          variant="flat"
          onChange={setCurrentPage}
        />
      </div>

      {/* Order Detail Modal */}
      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        size="4xl"
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Order Details</h2>
                {selectedOrder && (
                  <Chip
                    color={getStatusColor(selectedOrder.status)}
                    size="sm"
                    variant="flat"
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </Chip>
                )}
              </ModalHeader>
              <ModalBody>
                {selectedOrder && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <h3 className="font-medium">Customer Information</h3>
                        </CardHeader>
                        <CardBody className="pt-0">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">
                                {selectedOrder.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span>{selectedOrder.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span>{selectedOrder.activeWhatsappNumber}</span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <h3 className="font-medium">Order Information</h3>
                        </CardHeader>
                        <CardBody className="pt-0">
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium">Order ID:</span>{" "}
                              {selectedOrder.id}
                            </div>
                            <div>
                              <span className="font-medium">Product ID:</span>{" "}
                              {selectedOrder.productId}
                            </div>
                            <div>
                              <span className="font-medium">Product Name:</span>{" "}
                              {selectedOrder.name}
                            </div>
                            <div>
                              <span className="font-medium">Quantity:</span>{" "}
                              {selectedOrder.quantity}
                            </div>
                            <div>
                              <span className="font-medium">Total:</span>{" "}
                              {formatCurrency(selectedOrder.totalPrice)}
                            </div>
                            <div>
                              <span className="font-medium">Payment:</span>{" "}
                              {selectedOrder.paymentMethod}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <h3 className="font-medium">Timeline</h3>
                      </CardHeader>
                      <CardBody className="pt-0">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Created:</span>
                            <span>{formatDate(selectedOrder.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Last Updated:</span>
                            <span>{formatDate(selectedOrder.updatedAt)}</span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {selectedOrder.file && (
                      <Card>
                        <CardHeader>
                          <h3 className="font-medium">Attachments</h3>
                        </CardHeader>
                        <CardBody className="pt-0">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-600" />
                              <Image
                                height={500}
                                src={selectedOrder?.file}
                                width={1000}
                              />
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default OrderManagement;
