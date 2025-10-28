import React from "react";
import { Button } from "../../components/ui/button";

function NavBar() {
  return (
    <nav className="sticky top-0 z-10 w-full shadow-md backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
      <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
        <div className="flex-shrink-0">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Agentic Graph
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <ul className="hidden md:flex items-center space-x-1">
            <li>
              <Button variant="ghost" className="text-base font-medium">
                Home
              </Button>
            </li>
          </ul>
          <Button variant="outline">Signup</Button>
          <Button>Login</Button>
        </div>
      </div>
    </nav>
  );
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-7xl p-4">{children}</main>
    </>
  );
}
