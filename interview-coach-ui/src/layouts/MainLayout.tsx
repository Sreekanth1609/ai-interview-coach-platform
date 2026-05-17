import type { ReactNode } from "react";

import Navbar from "../components/Navbar";

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({
  children,
}: MainLayoutProps) {

  return (

    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Page Content */}
      <main className="relative z-10">
        {children}
      </main>

    </div>
  );
}

export default MainLayout;