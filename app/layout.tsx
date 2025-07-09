import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontGeologica } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/nextAuthProviders";
import ToastProviders from "@/components/ToasProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={clsx(
          "min-h-screen text-foreground font-geologica bg-background antialiased",
          fontGeologica.variable,
        )}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div
              className="relative flex flex-col h-screen w-full"
              suppressHydrationWarning={true}
            >
              <Navbar />
              <main
                className="container mx-auto min-w-full px-6"
                suppressHydrationWarning={true}
              >
                <ToastProviders>{children}</ToastProviders>
              </main>
              <Footer />
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
