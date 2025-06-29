/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Reusable Autocomplete Component
const Autocomplete = ({
  options = [],
  value,
  onValueChange,
  placeholder = "Select an option...",
  displayKey = "label",
  valueKey = "value",
  searchKey = "label",
  disabled = false,
  className = "",
  emptyMessage = "No options found",
  ...props
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<any>(null);
  const listRef = useRef<any>(null);
  const containerRef = useRef<any>(null);

  // Find selected option
  const selectedOption = options.find((option: any) =>
    typeof option === "string" ? option === value : option[valueKey] === value
  );

  // Filter options based on search term
  const filteredOptions = options.filter((option: any) => {
    const searchValue =
      typeof option === "string"
        ? option
        : option[searchKey] || option[displayKey];
    return searchValue.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: any) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          selectOption(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        closeDropdown();
        break;
      case "Tab":
        closeDropdown();
        break;
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex]);

  const openDropdown = () => {
    if (disabled) return;
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const selectOption = (option: any) => {
    const optionValue = typeof option === "string" ? option : option[valueKey];
    onValueChange(optionValue);
    closeDropdown();
  };

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
    setHighlightedIndex(-1);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleInputClick = () => {
    if (!isOpen) {
      openDropdown();
    }
  };

  // Display value in input
  const displayValue = isOpen
    ? searchTerm
    : selectedOption
    ? typeof selectedOption === "string"
      ? selectedOption
      : selectedOption[displayKey]
    : "";

  const getOptionDisplay = (option: any) => {
    return typeof option === "string" ? option : option[displayKey];
  };

  const getOptionValue = (option: any) => {
    return typeof option === "string" ? option : option[valueKey];
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            isOpen && "ring-2 ring-ring ring-offset-2"
          )}
          autoComplete="off"
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            <ul ref={listRef} className="py-1">
              {filteredOptions.map((option: any, index: any) => {
                const optionValue = getOptionValue(option);
                const optionDisplay = getOptionDisplay(option);
                const isSelected = value === optionValue;
                const isHighlighted = index === highlightedIndex;

                return (
                  <li
                    key={optionValue}
                    onClick={() => selectOption(option)}
                    className={cn(
                      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                      isHighlighted && "bg-accent text-accent-foreground",
                      isSelected &&
                        "bg-accent text-accent-foreground font-medium",
                      "hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    )}
                  >
                    <span className="flex-1">{optionDisplay}</span>
                    {isSelected && (
                      <Check className="h-4 w-4 ml-2 text-primary" />
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-2 py-1.5 text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Demo Usage Component
export default function AutocompleteDemo() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedUser, setSelectedUser] = useState("1");
  const [selectedFramework, setSelectedFramework] = useState("");

  // Sample data - different formats to show flexibility
  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "IN", name: "India", flag: "🇮🇳" },
  ];

  const users = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com" },
    { id: "4", name: "Alice Brown", email: "alice@example.com" },
    { id: "5", name: "Charlie Davis", email: "charlie@example.com" },
  ];

  // Simple string array
  const frameworks = [
    "React",
    "Vue.js",
    "Angular",
    "Svelte",
    "Next.js",
    "Nuxt.js",
    "Gatsby",
    "Remix",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Reusable Autocomplete Component</h1>
        <p className="text-muted-foreground">
          A flexible autocomplete component that works with different data
          structures
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Country Example with Custom Display */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">Country Selection</h3>
            <p className="text-sm text-muted-foreground">
              Object array with custom display format
            </p>
          </div>
          <Autocomplete
            options={countries}
            value={selectedCountry}
            onValueChange={setSelectedCountry}
            placeholder="Select a country..."
            displayKey="name"
            valueKey="code"
            searchKey="name"
            className="w-full"
          />
          <div className="text-sm text-muted-foreground">
            Selected:{" "}
            {selectedCountry
              ? countries.find((c) => c.code === selectedCountry)?.flag +
                " " +
                countries.find((c) => c.code === selectedCountry)?.name
              : "None"}
          </div>
        </div>

        {/* User Example */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">User Selection</h3>
            <p className="text-sm text-muted-foreground">
              Object array with email in search
            </p>
          </div>
          <Autocomplete
            options={users.map((user) => ({
              ...user,
              displayName: `${user.name} (${user.email})`,
            }))}
            value={selectedUser}
            onValueChange={setSelectedUser}
            placeholder="Select a user..."
            displayKey="displayName"
            valueKey="id"
            searchKey="displayName"
            className="w-full"
          />
          <div className="text-sm text-muted-foreground">
            Selected:{" "}
            {selectedUser
              ? users.find((u) => u.id === selectedUser)?.name
              : "None"}
          </div>
        </div>

        {/* Framework Example - Simple Strings */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">Framework Selection</h3>
            <p className="text-sm text-muted-foreground">Simple string array</p>
          </div>
          <Autocomplete
            options={frameworks}
            value={selectedFramework}
            onValueChange={setSelectedFramework}
            placeholder="Select a framework..."
            className="w-full"
          />
          <div className="text-sm text-muted-foreground">
            Selected: {selectedFramework || "None"}
          </div>
        </div>

        {/* Disabled Example */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">Disabled State</h3>
            <p className="text-sm text-muted-foreground">
              Shows how the component looks when disabled
            </p>
          </div>
          <Autocomplete
            options={frameworks}
            value="React"
            onValueChange={() => {}}
            placeholder="Disabled autocomplete..."
            disabled
            className="w-full"
          />
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-3">How to Use</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Click</strong> the input field to open the dropdown
          </p>
          <p>
            <strong>Type</strong> to filter options by the specified search key
          </p>
          <p>
            <strong>Arrow keys</strong> to navigate through options
          </p>
          <p>
            <strong>Enter</strong> to select the highlighted option
          </p>
          <p>
            <strong>Escape</strong> or click outside to close
          </p>
          <p>
            <strong>Tab</strong> to close and move to next field
          </p>
        </div>

        <h4 className="font-semibold mt-4 mb-2">Props</h4>
        <div className="text-xs space-y-1 font-mono bg-background p-3 rounded">
          <div>
            <span className="text-blue-600">options</span>: Array of objects or
            strings
          </div>
          <div>
            <span className="text-blue-600">value</span>: Current selected value
          </div>
          <div>
            <span className="text-blue-600">onValueChange</span>: Callback when
            value changes
          </div>
          <div>
            <span className="text-blue-600">displayKey</span>: Key to display in
            options (default: "label")
          </div>
          <div>
            <span className="text-blue-600">valueKey</span>: Key to use as value
            (default: "value")
          </div>
          <div>
            <span className="text-blue-600">searchKey</span>: Key to search
            against (default: "label")
          </div>
          <div>
            <span className="text-blue-600">placeholder</span>: Input
            placeholder text
          </div>
          <div>
            <span className="text-blue-600">disabled</span>: Disable the
            component
          </div>
          <div>
            <span className="text-blue-600">emptyMessage</span>: Message when no
            options found
          </div>
        </div>
      </div>
    </div>
  );
}
