
import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
declare module "next-auth/providers" {
  interface Credentials {
    email: string;
    password: string;
  }
}
declare module "next-auth/providers/google" {
  interface GoogleProfile {
    id: string;
    email: string;
    name: string;
    picture?: string;
  }
}
declare module "next-auth/providers/github" {
  interface GitHubProfile {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
  }
}
declare module "next-auth/providers/credentials" {
  interface Credentials {
    email: string;
    password: string;
  }
}
declare module "next-auth/adapters" {
  interface PrismaAdapter {
    user: {
      id: string;
      email: string;
      name?: string;
      role: Role;
    };
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    role: Role;
  }
}
