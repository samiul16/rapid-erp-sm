import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  UserCircle,
  Search,
  Maximize2,
  Bell,
  Heart,
  ChevronRight,
  History,
  Camera,
  Mic,
} from "lucide-react";
import LanguageToggle from "../LanguageToggle";
import clsx from "clsx";
import { logout } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notificationCount] = useState(3); // Example count
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const isRTL = i18n.language === "ar";

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setSearchQuery("");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between px-4 sm:px-6 w-full">
      {/* Left: Brand Logo */}
      <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold text-brand dark:text-brand text-blue-500">
          RAPID
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Search Field */}
        <div
          ref={searchRef}
          className={clsx(
            "transition-all duration-300 flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg",
            isSearchOpen ? "w-full sm:w-64" : "w-0 overflow-hidden"
          )}
        >
          {isSearchOpen && (
            <>
              <button
                onClick={toggleSearch}
                className={clsx(
                  "p-2 text-gray-500 dark:text-gray-400 border-2 bg-blue-400 hover:bg-blue-600 hover:text-white cursor-pointer rounded-l-lg",
                  isRTL ? "order-last" : "order-first"
                )}
                aria-label={t("navbar.search.close")}
              >
                <ChevronRight size={18} className="text-white" />
              </button>
              <input
                ref={inputRef}
                type="text"
                placeholder={t("navbar.search.placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={clsx(
                  "w-full py-1 bg-transparent border-0 focus:ring-0 text-gray-700 dark:text-gray-300",
                  isRTL ? "pr-2 text-right" : "pl-2 text-left"
                )}
                dir={i18n.language}
              />
              {/* Add voice and camera icons */}
              <div
                className={clsx(
                  "flex items-center px-2 space-x-1",
                  isRTL ? "order-first" : "order-last"
                )}
              >
                <button
                  type="button"
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                  aria-label={t("navbar.search.voice")}
                  onClick={() => console.log("Voice search clicked")} // Add your voice search handler
                >
                  <Mic size={18} />
                </button>
                <button
                  type="button"
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                  aria-label={t("navbar.search.camera")}
                  onClick={() => console.log("Camera search clicked")} // Add your camera search handler
                >
                  <Camera size={18} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Icons Container */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          {/* Search Toggle Button - Only visible when search is closed */}
          {!isSearchOpen && (
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              aria-label={t("navbar.search.open")}
            >
              <Search size={20} />
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label={
              isFullscreen
                ? t("navbar.exitFullscreen")
                : t("navbar.enterFullscreen")
            }
          >
            <Maximize2 size={20} />
          </button>

          {/* Notifications with Badge */}
          <div className="relative">
            <button
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              aria-label={t("navbar.notifications")}
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>

          {/* Favorites */}
          <button
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label={t("navbar.favorites")}
          >
            <Heart size={20} />
          </button>

          {/* Logout */}
          <button
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label={t("navbar.recent")}
            onClick={() => {
              navigate("/recent");
            }}
          >
            <History size={20} />
          </button>

          {/* Language Toggle */}
          <div className="">
            <LanguageToggle />
          </div>

          {/* Theme Toggle */}
          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label={
              theme === "dark"
                ? t("navbar.theme.light")
                : t("navbar.theme.dark")
            }
          >
            {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button> */}

          {/* User Profile */}
          <button
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label={t("navbar.user")}
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <UserCircle size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
