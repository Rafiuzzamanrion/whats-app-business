'use client';
import { useSession } from "next-auth/react";

export const useClientSession = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = !!session;
  const user = session?.user || null;

  return {
    session,
    isLoading,
    isAuthenticated,
    user,
  };
};
