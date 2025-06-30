import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar with fixed height */}
      <div className="flex-shrink-0">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with fixed width */}
        <div className="flex-shrink-0">
          <Sidebar />
        </div>

        {/* Content area with precise height calculation */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden dark:bg-gray-900">
          {" "}
          {/* min-h-0 prevents growing beyond parent */}
          {/* Outlet with exact remaining height (after navbar and footer) */}
          <div className="flex-1 overflow-hidden pl-2">
            <Outlet />
          </div>
          {/* Footer with fixed height */}
          <div className="flex-shrink-0">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
