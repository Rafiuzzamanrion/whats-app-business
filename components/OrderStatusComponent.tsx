"use client";
import React from "react";
import { CheckCircle, Clock } from "lucide-react";

type OrderStatus = "pending" | "confirmed";

interface OrderStatusProps {
  status: OrderStatus;
  orderNumber: string;
  estimatedDelivery?: string;
  onStatusChange?: (status: OrderStatus) => void;
  className?: string;
}

const OrderStatusComponent: React.FC<OrderStatusProps> = ({
  status,
  orderNumber,
  estimatedDelivery,
  onStatusChange,
  className = "",
}) => {
  const statusConfig = {
    pending: {
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      title: "Order Pending",
      description:
        "Your order is being reviewed and will be confirmed shortly.",
      gradient: "from-amber-400 to-orange-500",
    },
    confirmed: {
      icon: CheckCircle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      title: "Order Confirmed",
      description:
        "Great! Your order has been confirmed and is being prepared.",
      gradient: "from-emerald-400 to-teal-500",
    },
  };

  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {/* Main Status Card */}
      <div
        className={`
        ${currentStatus.bgColor} ${currentStatus.borderColor} 
        border-2 rounded-2xl p-6 shadow-lg backdrop-blur-sm
        transform hover:scale-105 transition-all duration-300 ease-in-out
        relative overflow-hidden
      `}
      >
        {/* Animated Background Gradient */}
        <div
          className={`
          absolute inset-0 bg-gradient-to-r ${currentStatus.gradient} 
          opacity-5 animate-pulse
        `}
        />

        {/* Status Icon with Animation */}
        <div className="flex items-center justify-center mb-4">
          <div
            className={`
            ${currentStatus.bgColor} ${currentStatus.borderColor}
            border-2 rounded-full p-4 shadow-md
            ${status === "pending" ? "animate-pulse" : ""}
            transform hover:rotate-12 transition-transform duration-300
          `}
          >
            <StatusIcon className={`w-8 h-8 ${currentStatus.color}`} />
          </div>
        </div>

        {/* Status Content */}
        <div className="text-center">
          <h3 className={`text-2xl font-bold ${currentStatus.color} mb-2`}>
            {currentStatus.title}
          </h3>
          <p className="text-gray-600 mb-4">{currentStatus.description}</p>

          {/* Order Details */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-mono font-semibold text-gray-800">
              #{orderNumber}
            </p>
          </div>

          {/* Estimated Delivery */}
          {estimatedDelivery && (
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="font-semibold text-gray-800">{estimatedDelivery}</p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className={`bg-gradient-to-r ${currentStatus.gradient} h-2 rounded-full transition-all duration-1000 ease-out`}
              style={{
                width: status === "pending" ? "30%" : "100%",
              }}
            />
          </div>

          {/* Action Buttons - Only for Pending */}
          {status === "pending" && (
            <button
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              onClick={() => onStatusChange?.("confirmed")}
            >
              Confirm Order
            </button>
          )}
        </div>
      </div>

      {/* Status Timeline */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-3">
          <div
            className={`
            w-3 h-3 rounded-full transition-all duration-300
            ${status === "pending" ? "bg-amber-500" : "bg-gray-400"}
          `}
          />
          <div
            className={`
            text-sm font-medium transition-colors duration-300
            ${status === "pending" ? "text-amber-500" : "text-gray-400"}
          `}
          >
            Order Pending
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div
            className={`
            w-3 h-3 rounded-full transition-all duration-300
            ${status === "confirmed" ? "bg-emerald-500" : "bg-gray-200"}
          `}
          />
          <div
            className={`
            text-sm font-medium transition-colors duration-300
            ${status === "confirmed" ? "text-emerald-500" : "text-gray-300"}
          `}
          >
            Order Confirmed
          </div>
        </div>
      </div>
    </div>
  );
};

// Example with your actual data
const OrderStatusExample = () => {
  // Your order data (from API, database, etc.)
  const orderData = {
    id: "ORD-2024-001234",
    status: "pending", // This comes from your data
    estimatedDelivery: "Dec 25, 2024",
    customerName: "John Doe",
    // ... other order fields
  };

  // Function to handle status updates (API call, etc.)
  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    try {
      // Make API call to update order status
      await fetch(`/api/orders/${orderData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      // Refresh data or update local state
      console.log("Order status updated to:", newStatus);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Order Status
        </h1>

        <OrderStatusComponent
          estimatedDelivery={orderData.estimatedDelivery}
          orderNumber={orderData.id}
          status={orderData.status as OrderStatus}
          onStatusChange={handleStatusUpdate}
        />

        {/* Multiple Orders Example */}
      </div>
    </div>
  );
};

export default OrderStatusExample;
