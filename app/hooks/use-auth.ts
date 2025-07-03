
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    isAdmin: session?.user?.role === Role.ADMIN,
    isSuperAdmin: session?.user?.role === Role.SUPER_ADMIN,
    isAdminOrSuperAdmin:
      session?.user?.role === Role.ADMIN ||
      session?.user?.role === Role.SUPER_ADMIN,
  };
}

export function useRequireAuth() {
  const auth = useAuth();

  if (!auth.isAuthenticated && !auth.isLoading) {
    throw new Error("Authentication required");
  }

  return auth;
}

export function useRequireAdmin() {
  const auth = useAuth();

  if (!auth.isAdminOrSuperAdmin && !auth.isLoading) {
    throw new Error("Admin access required");
  }

  return auth;
}

export function useRequireSuperAdmin() {
  const auth = useAuth();

  if (!auth.isSuperAdmin && !auth.isLoading) {
    throw new Error("Super admin access required");
  }

  return auth;
}
