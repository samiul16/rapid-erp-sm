import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          {/* Outlet with fixed height (100vh - navbar - footer) */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
            <Outlet />
          </div>
          {/* Footer always at bottom */}
          <div className="flex-shrink-0 bg-gray-50 dark:bg-gray-900">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
