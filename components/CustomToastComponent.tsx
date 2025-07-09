import React from "react";
import { addToast } from "@heroui/react";


type ToastColor =
  | "success"
  | "danger"
  | "warning"
  | "default"
  | "primary"
  | "secondary"
  | "foreground";

interface ToastProps {
  title: string;
  description: string;
  color?: ToastColor;
  timeout?: number;
  variant?: "bordered" | "solid" | "flat";
  icon?: React.ReactNode;
}

const CustomToastComponent: React.FC<ToastProps> = ({
  title,
  description,
  color = "default",
  timeout = 5000,
  variant = "solid",
  icon = null,
}) => {
  addToast({
    title,
    description,
    color,
    timeout,
    variant,
    icon,
    loadingIcon: undefined,
  });

  return null;
};

export default CustomToastComponent;
