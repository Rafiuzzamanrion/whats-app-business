"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Chip } from "@heroui/chip";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { addToast } from "@heroui/react";

import { useRequireAdmin } from "@/app/hooks/use-auth";
import Unauthorized from "@/components/Unathorized";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
}

export function AdminPanel() {
  const { user, isSuperAdmin, isAdminOrSuperAdmin } = useRequireAdmin();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");

      if (response.ok) {
        const data = await response.json();

        setUsers(data);
      } else {
        setError("Failed to fetch users");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        await fetchUsers();
        addToast({
          title: "Success",
          description: "Role updated successfully",
          color: "success",
          timeout: 3000,
        });
      } else {
        setError("Failed to update user role");
        addToast({
          title: "Error",
          description: "Failed to update role",
          color: "danger",
          timeout: 3000,
        });
      }
    } catch (error) {
      setError("Network error");
    }
  };

  const deleteUser = async (userId: string) => {
    if (!isSuperAdmin) {
      addToast({
        title: "Unauthorized",
        description: "You are not authorized to delete users.",
        color: "danger",
        timeout: 3000,
      });

      return;
    }
    if (user?.id === userId) {
      addToast({
        title: "Error",
        description: "You cannot delete your own account.",
        color: "danger",
        timeout: 3000,
      });

      return;
    }
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchUsers();
        addToast({
          title: "Success",
          description: "User deleted successfully",
          color: "success",
          timeout: 3000,
        });
      } else {
        setError("Failed to delete user");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  const roleColorMap: Record<
    string,
    "success" | "danger" | "warning" | "default" | "primary"
  > = {
    SUPER_ADMIN: "primary",
    ADMIN: "warning",
    USER: "success",
  };

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
    <div className="min-h-screen">
      <Navbar isBordered className={"w-full"}>
        <NavbarBrand>
          <h1 className="text-xl font-semibold text-primary">Admin Panel</h1>
        </NavbarBrand>
        <NavbarContent className={"uppercase"} justify="end">
          <NavbarItem>
            <Link
              className="text-success hover:text-purple-500 font-medium text-small"
              href="/admin"
            >
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-successhover:text-purple-500 font-medium text-small"
              href="/admin/orders"
            >
              Order Management
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-success hover:text-purple-500 font-medium text-small"
              href="/admin/postPricingData"
            >
              Add Package
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-success hover:text-purple-500 font-medium text-small"
              href="/admin/postBusinessApi"
            >
              Add Business API
            </Link>
          </NavbarItem>

          <NavbarItem>
            <span className="text-sm text-foreground-500">
              {user?.name || user?.email} ({user?.role})
            </span>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">
            Welcome, {user?.name || user?.email}!
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner color="primary" label="Loading users..." size={"lg"} />
            </div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : (
            <Table aria-label="Users table" className="mt-4">
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>NAME</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {users.map((userItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{userItem.id}</TableCell>
                    <TableCell>
                      {user?.id === userItem?.id ? (
                        <Chip color={"success"} variant={"flat"}>
                          {userItem.name || "N/A"}
                        </Chip>
                      ) : (
                        userItem.name || "N/A"
                      )}
                    </TableCell>
                    <TableCell>{userItem.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Chip
                          color={roleColorMap[userItem.role] || "default"}
                          variant="flat"
                        >
                          {userItem.role}
                        </Chip>
                        {isSuperAdmin && (
                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                className="min-w-0 px-2"
                                size="sm"
                                variant="light"
                              >
                                <svg
                                  fill="none"
                                  height="16"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  width="16"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m6 9 6 6 6-6" />
                                </svg>
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              aria-label="User role actions"
                              onAction={(key) =>
                                updateUserRole(userItem.id, key.toString())
                              }
                            >
                              <DropdownItem key="USER">User</DropdownItem>
                              <DropdownItem key="ADMIN">Admin</DropdownItem>
                              <DropdownItem key="SUPER_ADMIN">
                                Super Admin
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Button
                        color="danger"
                        size="sm"
                        variant="bordered"
                        onPress={() => deleteUser(userItem.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
}
