"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

export default function ToastProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeroUIProvider>
      <ToastProvider placement={"top-center"} />
      {children}
    </HeroUIProvider>
  );
}
