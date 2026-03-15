import { Outlet, Navigate } from "react-router";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../context/AuthContext";

export function AppLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="p-4 md:p-8 pt-16 md:pt-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
