import { useState, useEffect, useRef } from "react";
import { GoTriangleDown } from "react-icons/go";
import clsx from "clsx";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FiEdit, FiEye, FiPlusCircle } from "react-icons/fi";

type TAction = {
  key: "create" | "update" | "view";
  label: string;
};

type THeaderDropdownProps = {
  path: string;
  id?: string;
  actions?: TAction[];
};

const icons = {
  create: <FiPlusCircle className="text-purple-500 mr-2" />,
  update: <FiEdit className="text-primary-500 mr-2" />,
  view: <FiEye size={18} className="text-green-500 mr-2" />,
};

const HeaderDropdown: React.FC<THeaderDropdownProps> = ({
  path,
  id,
  actions = [],
}) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".p-2")
      ) {
        setShowActions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center relative">
      <Button
        onClick={() => navigate(`/${path}`)}
        className="rounded-r-none pr-2"
        variant="default"
        type="submit"
      >
        List
      </Button>
      <div
        className="p-2 border-l text-white border-b-white h-10 rounded-r-full bg-primary-500 cursor-pointer"
        onClick={() => setShowActions(!showActions)}
      >
        <GoTriangleDown
          className={clsx(
            "text-xl transition-all mt-[2px]",
            showActions ? "rotate-180" : ""
          )}
        />
      </div>

      <div
        ref={modalRef}
        className={clsx(
          "absolute right-0 top-[110%] p-1 w-full min-h-20 bg-white border rounded transition-all border-gray-300",
          showActions ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        {actions.map(({ key, label }) => {
          const navigateTo =
            key === "create"
              ? `/${path}/${key}`
              : `/${path}/${key}/${id || ""}`;
          return (
            <div
              key={key}
              className="flex items-center gap-1 pl-2 p-1 hover:bg-gray-100 rounded-sm w-full cursor-pointer"
              onClick={() => navigate(navigateTo)}
            >
              {icons[key] || <Eye className="size-5" />}
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderDropdown;
