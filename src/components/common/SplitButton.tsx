import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface PopoverOption {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

interface SplitButtonProps {
  onListClick?: () => void;
  listText?: string;
  listPath?: string;
  popoverOptions: PopoverOption[];
}

export const SplitButton = ({
  onListClick,
  listText = "List",
  listPath,
  popoverOptions,
}: SplitButtonProps) => {
  const navigate = useNavigate();

  const handleListClick = () => {
    if (onListClick) {
      onListClick();
    } else if (listPath) {
      navigate(listPath);
    }
  };

  const handleOptionClick = (option: PopoverOption) => {
    if (option.onClick) {
      option.onClick();
    } else if (option.path) {
      navigate(option.path);
    }
  };

  return (
    <div className="flex items-center rtl:flex-row-reverse">
      {/* Main Button */}
      <Button
        variant="outline"
        className="bg-primary hover:bg-primary text-white rounded-l-full rounded-r-none border-r-1 px-4 py-2"
        onClick={handleListClick}
      >
        {listText}
      </Button>

      {/* Dropdown Button */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="bg-primary hover:bg-primary text-white rounded-r-full rounded-l-none border-l-0 px-2 py-2"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-1" align="end">
          <div className="flex flex-col">
            {popoverOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start gap-2 h-9 px-2 py-1 hover:bg-gray-100"
                onClick={() => handleOptionClick(option)}
              >
                {option.icon}
                {option.label}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
