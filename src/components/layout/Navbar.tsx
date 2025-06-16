import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";
import {
  SunIcon,
  MoonIcon,
  UserCircle,
  Search,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import LanguageToggle from "../LanguageToggle";
import clsx from "clsx";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isRTL = i18n.language === "ar";

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
                  "p-1.5 text-gray-500 dark:text-gray-400 border-3",
                  isRTL ? "order-last" : "order-first"
                )}
                aria-label={t("navbar.search.close")}
              >
                {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </button>
              <input
                ref={inputRef}
                type="text"
                placeholder={t("navbar.search.placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={clsx(
                  "w-full py-1 bg-transparent border-0 focus:ring-0 text-gray-700 dark:text-gray-300",
                  isRTL ? "pr-1 text-right" : "pl-2 text-left"
                )}
                dir={i18n.language}
              />
            </>
          )}
        </div>

        {/* Search Toggle Button - Only visible when search is closed */}
        {!isSearchOpen && (
          <button
            onClick={toggleSearch}
            className="inline-flex items-center justify-center rounded-full p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={t("navbar.search.open")}
          >
            <Search size={20} />
          </button>
        )}

        <div className="scale-110 sm:scale-125">
          <LanguageToggle />
        </div>

        <button
          onClick={toggleTheme}
          className="inline-flex items-center justify-center rounded-full p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={
            theme === "dark" ? t("navbar.theme.light") : t("navbar.theme.dark")
          }
        >
          {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button>

        <button
          className="inline-flex items-center justify-center rounded-full p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={t("navbar.user")}
        >
          <UserCircle size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
