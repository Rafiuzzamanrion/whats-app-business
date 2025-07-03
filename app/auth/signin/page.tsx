"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/button";
import {Input} from "@heroui/input";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        const session = await getSession();

        if (session?.user?.role === "SUPER_ADMIN") {
          router.push("/admin");
        } else if (session?.user?.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/admin");
        }
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/admin" });
  };

  const handleGitHubSignIn = async () => {
    await signIn("github", { callbackUrl: "/admin" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="my-7 uppercase text-center text-3xl font-extrabold ">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-5">
            <div>
              <Input
                key={"email"}
                required
                color={"success"}
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Input
                key={"password"}
                required
                className=""
                color={"success"}
                label="Password"
                placeholder="Enter your email"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4"
              color={"success"}
              disabled={isLoading}
              type="submit"
              variant={"shadow"}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          <div className="flex flex-col space-y-2">
            <Button
              className="w-full flex justify-center py-2 px-4"
              color={"primary"}
              type="button"
              variant={"shadow"}
              onPress={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
          </div>

          <div className="text-center">
            <Link
              className="text-indigo-600 hover:text-indigo-500"
              href="/auth/signup"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
