import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Footer = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-4 px-6 bg-gray-100 dark:bg-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto cursor-pointer">
        {/* Left Section - Powered by (left-aligned) */}
        <div className="flex justify-start items-center cursor-pointer">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Powered by{" "}
            <span
              className="text-primary font-medium cursor-pointer"
              onClick={() =>
                window.open("https://rapidsmarterp.com/", "_blank")
              }
            >
              Rapid
            </span>
          </span>
        </div>

        {/* Middle Section - Help (center-aligned) */}
        <div className="flex justify-center items-center cursor-pointer">
          <Popover open={isHelpOpen} onOpenChange={setIsHelpOpen}>
            <PopoverTrigger asChild>
              <button
                className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
                onClick={() => setIsHelpOpen(!isHelpOpen)}
              >
                Need help?
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4 text-sm">
              <h4 className="font-medium mb-2">Page Assistance</h4>
              <p className="text-gray-600 dark:text-gray-300">
                This page helps you manage your account settings and
                preferences. Use the navigation menu to access different
                sections.
              </p>
            </PopoverContent>
          </Popover>
        </div>

        {/* Right Section - Live Chat (right-aligned) */}
        <div className="flex justify-end items-center cursor-pointer">
          <button
            className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
            onClick={() =>
              window.open(
                "https://web.whatsapp.com/send?phone=971562015468&text=",
                "_blank"
              )
            }
          >
            Live Chat
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
