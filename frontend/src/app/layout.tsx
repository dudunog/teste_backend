import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import LeftSideBarServer from "@/components/left-sidebar-server";
import { AdminProvider } from "@/app/tasks/contexts/admin-context";
import { ListsProvider } from "./tasks/contexts/lists-context";
import LayoutClient from "./layout-client";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Task Management",
  description: "Task Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdminProvider>
          <ListsProvider>
            <NuqsAdapter>
              <LeftSideBarServer />

              <LayoutClient>
                <main className={"flex flex-col items-center w-full p-4"}>
                  {children}
                </main>

                <Toaster />
              </LayoutClient>
            </NuqsAdapter>
          </ListsProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
