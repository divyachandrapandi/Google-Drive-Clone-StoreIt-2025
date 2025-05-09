import React from "react";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import GuestHeader from "@/components/GuestHeader";

const Layout = async ({ params, children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen">
      <Sidebar />

      <section className="flex h-full flex-1 flex-col">
        <GuestHeader />
        <div className="main-content remove-scrollbar">{children}</div>
      </section>

      <Toaster />
    </main>
  );
};
export default Layout;
