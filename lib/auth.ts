import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { compare } from "bcryptjs";
import { Role } from "@prisma/client";

import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Debug logging for production
      console.log("JWT Callback - trigger:", trigger);
      console.log(
        "JWT Callback - user:",
        user ? { id: user.id, role: user.role } : "No user",
      );
      console.log(
        "JWT Callback - existing token:",
        token ? { id: token.id, role: token.role } : "No token",
      );

      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // For OAuth providers, fetch the role from database
      if (user && !user.role && token.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
            select: { role: true, id: true },
          });

          if (dbUser) {
            token.role = dbUser.role;
            token.id = dbUser.id;
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }

      // Handle session update
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      console.log("JWT Callback - final token:", {
        id: token.id,
        role: token.role,
      });

      return token;
    },
    async session({ session, token }) {
      console.log(
        "Session Callback - token:",
        token ? { id: token.id, role: token.role } : "No token",
      );

      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }

      console.log("Session Callback - final session:", {
        id: session.user.id,
        role: session.user.role,
      });

      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("SignIn Callback - provider:", account?.provider);
      console.log(
        "SignIn Callback - user:",
        user ? { email: user.email, name: user.name } : "No user",
      );

      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                role: Role.USER,
              },
            });

            console.log("Created new user:", {
              id: newUser.id,
              role: newUser.role,
            });
          } else {
            console.log("Existing user found:", {
              id: existingUser.id,
              role: existingUser.role,
            });
          }
        } catch (error) {
          console.error("Error during sign in:", error);

          return false;
        }
      }

      return true;
    },
  },
  // Add these production-specific settings
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  // Enable debug in production temporarily
  debug: process.env.NODE_ENV === "production",
};
