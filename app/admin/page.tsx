"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { Spinner } from "@heroui/spinner";

import { useAuth } from "@/app/hooks/use-auth";

export default function Dashboard() {
  const { user, isLoading, isAdmin, isSuperAdmin, isAdminOrSuperAdmin } =
    useAuth();

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

  return (
    <div className="min-h-screen">
      <nav className="shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAdminOrSuperAdmin && (
                <Link
                  className="text-blue-600 hover:text-blue-500 font-medium"
                  href="/admin/adminPanel"
                >
                  Admin Panel
                </Link>
              )}
              <button
                className="text-red-600 hover:text-red-500 font-medium"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className=" overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold  mb-4">
                Welcome, {user?.name || user?.email}!
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900">
                    Your Role
                  </h3>
                  <p className="text-blue-700 capitalize">
                    {user?.role.toLowerCase().replace("_", " ")}
                  </p>
                </div>

                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-900">
                    Account Status
                  </h3>
                  <p className="text-green-700">Active</p>
                </div>

                <div className="bg-purple-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-purple-900">
                    Member Since
                  </h3>
                  <p className="text-purple-700">Welcome!</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium  mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Update Profile
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                    View Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
