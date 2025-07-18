"use client";
import React from "react";
import { Spinner } from "@heroui/spinner";

import { AdminPanel } from "@/components/AdminPage";
import Unauthorized from "@/components/Unathorized";
import { useAuth } from "@/app/hooks/use-auth";

const Page = () => {
  const { isAdminOrSuperAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg flex items-center gap-2">
          <Spinner color={"success"} size={"lg"} variant={"default"} />
          Loading...
        </div>
      </div>
    );
  }
  if (!isAdminOrSuperAdmin) {
    return <Unauthorized />;
  }

  return (
    <div>
      <AdminPanel />
    </div>
  );
};

export default Page;
