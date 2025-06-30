import { Check, X } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";

const EditableInput = ({
  id,
  name,
  value,
  onChange,
  onNext,
  onCancel,
  // placeholder,
  maxLength,
  required = false,
  className = "",
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onCancel: () => void;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  className?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validate = (val: string) => {
    if (required) {
      const valid = val.trim().length > 0;
      setIsValid(valid);
      return valid;
    }
    return true;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (validate(value)) {
        onNext();
      }
    }
    if (e.key === "Escape") {
      onCancel();
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    validate(value);
  };

  const handleCancel = () => {
    setIsTouched(false);
    setIsValid(true);
    onCancel();
  };

  const handleNext = () => {
    setIsTouched(true);
    if (validate(value)) {
      onNext();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    // Revalidate on change if already touched
    if (isTouched) {
      validate(e.target.value);
    }
  };

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        // placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        className={`pr-10 focus:border-blue-400 focus-visible:ring-blue-400 ${
          !isValid && isTouched
            ? "border-red-400 focus-visible:ring-red-400"
            : ""
        } ${className}`}
      />
      {value && (
        <div className="absolute right-2 top-1/3 transform -translate-y-1/2 flex gap-1">
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="text-gray-500 hover:text-green-500"
          >
            <Check className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Reserve space for error message */}
      <div className="mt-1 min-h-[1rem]">
        {!isValid && isTouched && (
          <p className="text-xs text-red-500">This field is required</p>
        )}
      </div>
    </div>
  );
};

export default EditableInput;
