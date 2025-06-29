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
  X,
  Clock,
  TrendingUp,
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
  const [notificationCount] = useState(3);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([
    "react table components",
    "data visualization",
    "dashboard design patterns",
    "user interface components",
    "responsive web design",
  ]);
  const [suggestions] = useState([
    "google account",
    "google.com search",
    "google map",
    "google classroom",
    "google mail",
    "google chrome",
    "google play",
    "google sign in",
    "google search",
  ]);

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
        setShowSuggestions(false);
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
    if (!isSearchOpen) {
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    // Add to search history if not already present
    if (!searchHistory.includes(suggestion)) {
      setSearchHistory((prev) => [suggestion, ...prev.slice(0, 4)]);
    }
    // Perform search here
    console.log("Searching for:", suggestion);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Add to search history
      if (!searchHistory.includes(searchQuery)) {
        setSearchHistory((prev) => [searchQuery, ...prev.slice(0, 4)]);
      }
      setShowSuggestions(false);
      console.log("Searching for:", searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const removeFromHistory = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory((prev) => prev.filter((h) => h !== item));
  };

  // Filter suggestions based on search query
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 w-full relative z-50 h-16">
      <div className="grid grid-cols-12 gap-4 h-full items-center">
        {/* Left: Brand Logo - 2 columns */}
        <div className="col-span-2">
          <div className="text-2xl font-bold text-brand dark:text-brand text-blue-500">
            RAPID
          </div>
        </div>

        {/* Middle: Empty Space - 3 columns */}
        <div className="col-span-2"></div>

        {/* Right: Controls and Search - 7 columns */}
        <div className="col-span-5 flex items-center justify-end relative">
          {/* Google-Style Search Field */}
          <div
            ref={searchRef}
            className={clsx(
              "absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out",
              isSearchOpen
                ? "w-150 sm:w-150 opacity-100"
                : "w-0 opacity-0 overflow-hidden"
            )}
            style={{
              transformOrigin: "right center",
            }}
          >
            {isSearchOpen && (
              <div className="relative">
                {/* Main Search Input */}
                <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <button
                    onClick={handleSearch}
                    className="p-3 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    aria-label={t("navbar.search.search")}
                  >
                    <Search size={20} />
                  </button>

                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={t("navbar.search.placeholder")}
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyPress={handleKeyPress}
                    className={clsx(
                      "flex-1 py-3 bg-transparent border-0 focus:ring-0 text-gray-700 dark:text-gray-300 text-base outline-none",
                      isRTL ? "pr-2 text-right" : "pl-2 text-left"
                    )}
                    dir={i18n.language}
                  />

                  {/* Clear button */}
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      aria-label="Clear search"
                    >
                      <X size={18} />
                    </button>
                  )}

                  {/* Voice and Camera buttons */}
                  <div className="flex items-center px-2 border-l border-gray-200 dark:border-gray-600 ml-2">
                    <button
                      type="button"
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label={t("navbar.search.voice")}
                      onClick={() => console.log("Voice search clicked")}
                    >
                      <Mic size={20} />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label={t("navbar.search.camera")}
                      onClick={() => console.log("Camera search clicked")}
                    >
                      <Camera size={20} />
                    </button>
                  </div>

                  <button
                    onClick={toggleSearch}
                    className="p-2 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label={t("navbar.search.close")}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                    {/* Search History */}
                    {searchHistory.length > 0 && !searchQuery && (
                      <div className="py-2">
                        <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Recent searches
                        </div>
                        {searchHistory.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group"
                            onClick={() => handleSuggestionClick(item)}
                          >
                            <Clock
                              size={16}
                              className="text-gray-400 mr-3 flex-shrink-0"
                            />
                            <span className="flex-1 text-gray-700 dark:text-gray-300">
                              {item}
                            </span>
                            <button
                              onClick={(e) => removeFromHistory(item, e)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
                              aria-label="Remove from history"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Search Suggestions */}
                    {searchQuery && filteredSuggestions.length > 0 && (
                      <div className="py-2">
                        {!searchQuery && (
                          <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Suggestions
                          </div>
                        )}
                        {filteredSuggestions
                          .slice(0, 8)
                          .map((suggestion, index) => (
                            <div
                              key={index}
                              className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              <Search
                                size={16}
                                className="text-gray-400 mr-3 flex-shrink-0"
                              />
                              <span className="text-gray-700 dark:text-gray-300">
                                {/* Highlight matching text */}
                                {suggestion
                                  .split(new RegExp(`(${searchQuery})`, "gi"))
                                  .map((part, i) =>
                                    part.toLowerCase() ===
                                    searchQuery.toLowerCase() ? (
                                      <strong key={i} className="font-medium">
                                        {part}
                                      </strong>
                                    ) : (
                                      part
                                    )
                                  )}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Trending searches (optional) */}
                    {!searchQuery && searchHistory.length === 0 && (
                      <div className="py-2">
                        <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Trending
                        </div>
                        {["react hooks", "typescript tutorial", "css grid"].map(
                          (trend, index) => (
                            <div
                              key={index}
                              className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                              onClick={() => handleSuggestionClick(trend)}
                            >
                              <TrendingUp
                                size={16}
                                className="text-gray-400 mr-3 flex-shrink-0"
                              />
                              <span className="text-gray-700 dark:text-gray-300">
                                {trend}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {/* No results */}
                    {searchQuery && filteredSuggestions.length === 0 && (
                      <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                        No suggestions found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3 flex items-center justify-end relative">
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

            {/* Recent */}
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
      </div>
    </nav>
  );
};

export default Navbar;
