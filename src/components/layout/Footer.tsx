import { useState } from "react";
import { MessageCircle, HelpCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Footer = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-4 px-6 bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Left Section - Powered by */}
        <div className="mb-2 md:mb-0">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Powered by <span className="text-blue-500 font-medium">Rapid</span>
          </span>
        </div>

        {/* Middle Section - Help */}
        <div className="mb-2 md:mb-0">
          <Popover open={isHelpOpen} onOpenChange={setIsHelpOpen}>
            <PopoverTrigger asChild>
              <button
                className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                onClick={() => setIsHelpOpen(!isHelpOpen)}
              >
                <HelpCircle className="w-4 h-4 mr-1" />
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

        {/* Right Section - Live Chat */}
        <div>
          <button className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <MessageCircle className="w-4 h-4 mr-1" />
            Live Chat
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
