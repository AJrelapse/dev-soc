"use client"; // Mark the component as a client component

import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "./providers";
import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation"; // Import usePathname to get the current route

export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname(); // Get the current route

  // Check if we're on the sign-in or sign-up page
  const isAuthPage = pathname?.includes("/auth/sign-in") || pathname?.includes("/auth/sign-up");

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader showSpinner={false} />
          <div className="flex min-h-screen">
            {/* Only render Sidebar if it's not the sign-in or sign-up page */}
            {!isAuthPage && <Sidebar />}

            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              {/* Only render Header if it's not the sign-in or sign-up page */}
              {!isAuthPage && <Header />}
              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
