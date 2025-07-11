"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { LockKeyhole, ArrowRight } from "lucide-react";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/50 mb-6">
            <LockKeyhole className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            You don&apos;t have permission to view this page. Please sign in
            with an authorized account.
          </p>

          <div className="flex flex-col space-y-4">
            <Button
              className="w-full"
              color="primary"
              endContent={<ArrowRight className="ml-2 h-4 w-4" />}
              variant={"shadow"}
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </Button>

            <Button
              className="w-full"
              variant="shadow"
              onClick={() => router.push("/")}
            >
              Return Home
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Need access? Contact support@yourdomain.com
          </p>
        </div>
      </div>
    </div>
  );
}
