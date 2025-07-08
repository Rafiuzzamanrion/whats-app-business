"use client";

import { useState, useEffect } from "react";
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

import { useRequireAdmin } from "@/app/hooks/use-auth";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminPanel() {
  const { user, isSuperAdmin, isAdmin } = useRequireAdmin();
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
        fetchUsers();
      } else {
        setError("Failed to update user role");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers();
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

  return (
    <div className="min-h-screen">
      <Navbar className={'w-full'} isBordered>
        <NavbarBrand>
          <h1 className="text-xl font-semibold text-primary">Admin Panel</h1>
        </NavbarBrand>
        <NavbarContent justify="end">
          {(isSuperAdmin || isAdmin) && (
            <NavbarItem>
              <Link
                className="text-purple-600 hover:text-purple-500 font-medium"
                href="/admin/adminPanel"
              >
                Admin Panel
              </Link>
            </NavbarItem>
          )}
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
                        <Chip variant={"flat"} color={"success"}>{userItem.name || "N/A"}</Chip>
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
