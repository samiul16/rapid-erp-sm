import { Check, X } from "lucide-react";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Input } from "@/components/ui/input";

export interface EditableInputRef {
  focus: () => void;
  validate: () => boolean;
}

const EditableInput = forwardRef<
  EditableInputRef,
  {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNext?: () => void;
    onCancel?: () => void;
    placeholder?: string;
    maxLength?: number;
    required?: boolean;
    className?: string;
    tooltipText?: string;
  }
>(
  (
    {
      id,
      name,
      value,
      onChange,
      onNext,
      onCancel,
      placeholder,
      maxLength,
      required = false,
      className = "",
      tooltipText,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    const validate = (val: string) => {
      if (required) {
        const valid = val.trim().length > 0;
        setIsValid(valid);
        return valid;
      }
      return true;
    };

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      validate: () => {
        setIsTouched(true);
        return validate(value);
      },
    }));

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setIsTouched(true);
        if (validate(value)) {
          onNext?.();
        }
      }
      if (e.key === "Escape") {
        onCancel?.();
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
      setIsTouched(true);
      validate(value);
    };

    const handleCancel = () => {
      setIsTouched(false);
      setIsValid(true);
      onCancel?.();
    };

    const handleNext = () => {
      setIsTouched(true);
      if (validate(value)) {
        onNext?.();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      // Revalidate on change if already touched
      if (isTouched) {
        validate(e.target.value);
      }
    };

    // Generate tooltip text based on field name or use custom tooltipText
    const getTooltipText = () => {
      if (tooltipText) return tooltipText;

      switch (name.toLowerCase()) {
        case "code":
          return "Please enter country code (e.g., US, UK)";
        case "callingcode":
          return "Please enter calling code (e.g., +1, +44)";
        case "title":
          return "Please enter full country name";
        default:
          return `Please enter your ${name.toLowerCase()}`;
      }
    };

    return (
      <div className="relative w-full">
        {/* Tooltip */}
        {isFocused && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white text-black text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-gray-200">
              {getTooltipText()}
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
              </div>
            </div>
          </div>
        )}

        <Input
          ref={inputRef}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          className={`pr-10 focus:border-primary focus-visible:ring-primary ${
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
              className="text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="text-green-500"
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
  }
);

EditableInput.displayName = "EditableInput";

export default EditableInput;
