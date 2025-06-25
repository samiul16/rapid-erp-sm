import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import YoutubeButton from "@/components/common/YoutubeButton";
import EditableInput from "@/components/common/EditableInput";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StateData = {
  id?: string;
  name: string;
  countryCode: string;
  code: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type CountryOption = {
  code: string;
  name: string;
  flag: string;
  callingCode: string;
};

const MOCK_COUNTRIES: CountryOption[] = [
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", callingCode: "+971" },
  { code: "US", name: "United States", flag: "🇺🇸", callingCode: "+1" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", callingCode: "+44" },
  { code: "IN", name: "India", flag: "🇮🇳", callingCode: "+91" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", callingCode: "+966" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", callingCode: "+92" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", callingCode: "+20" },
  { code: "CA", name: "Canada", flag: "🇨🇦", callingCode: "+1" },
  { code: "AU", name: "Australia", flag: "🇦🇺", callingCode: "+61" },
  { code: "FR", name: "France", flag: "🇫🇷", callingCode: "+33" },
];

const defaultStateData: StateData = {
  name: "",
  countryCode: "",
  code: "",
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
};

type Props = {
  isEdit?: boolean;
  initialData?: StateData;
};

export default function StateCreateEdit({
  isEdit = false,
  initialData,
}: Props) {
  const { t, i18n } = useTranslation();
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<StateData>(
    initialData || defaultStateData
  );

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData(initialData);
    }
  }, [isEdit, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCountryChange = (value: string) => {
    setFormData({
      ...formData,
      countryCode: value,
    });
  };

  const getSelectedCountry = () => {
    return MOCK_COUNTRIES.find((c) => c.code === formData.countryCode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("State form submitted:", formData);
    // Add your submission logic here
  };

  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData(defaultStateData);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="container mx-auto px-4 py-6 flex-grow"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mb-8">
          <div className="flex gap-2 items-center">
            <YoutubeButton videoId="your-video-id" />
            <h1 className="text-xl font-bold text-blue-400">
              {isEdit ? t("form.editingState") : t("form.creatingState")}
            </h1>
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 p-5 bg-blue-400 hover:bg-blue-600  text-white hover:text-white cursor-pointer rounded-full"
              onClick={() => navigate("/states")}
            >
              {t("button.list")}
            </Button>
          </div>
        </div>

        {/* Main Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border p-6 mb-6 dark:bg-gray-800 dark:border-gray-700"
        >
          {/* First Row: Name, Country, Code */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            {/* State Name - 4 columns */}
            <div className="md:col-span-4 space-y-1">
              <Label htmlFor="name">{t("form.name")}</Label>
              <EditableInput
                id="name"
                name="name"
                className="h-10"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("form.namePlaceholder")}
                onNext={() => {
                  document.getElementById("countryCode")?.focus();
                }}
                onCancel={() => {
                  setFormData({ ...formData, name: "" });
                }}
                required
              />
            </div>

            {/* Country Dropdown - 4 columns */}
            <div className="md:col-span-2 space-y-1">
              <Label htmlFor="countryCode">{t("form.country")}</Label>
              <Select
                value={formData.countryCode}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="h-10" id="countryCode">
                  <SelectValue placeholder={t("form.selectCountry")}>
                    {formData.countryCode && getSelectedCountry() ? (
                      <div className="flex items-center gap-2">
                        <span>{getSelectedCountry()?.flag}</span>
                        <span>{getSelectedCountry()?.name}</span>
                      </div>
                    ) : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {MOCK_COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                        <span className="text-muted-foreground ml-2">
                          {country.callingCode}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* State Code - 4 columns */}
            <div className="md:col-span-6 space-y-1">
              <Label htmlFor="code">{t("form.description")}</Label>
              <EditableInput
                id="code"
                name="code"
                className="h-10"
                value={formData.code}
                onChange={handleChange}
                placeholder={t("form.descriptionPlaceholder")}
                onNext={() => {
                  document.getElementById("isActive")?.focus();
                }}
                onCancel={() => {
                  setFormData({ ...formData, code: "" });
                }}
                required
              />
            </div>
          </div>

          {/* Second Row: Active, Draft, Delete, Default */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-center">
            {/* Active Switch - 3 columns */}
            <div className="md:col-span-3 flex items-center gap-4">
              <Label htmlFor="isActive" className="whitespace-nowrap">
                {t("common.active")}
              </Label>
              <Switch
                id="isActive"
                name="isActive"
                className="data-[state=checked]:bg-blue-400"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </div>

            {/* Draft Switch - 3 columns */}
            <div className="md:col-span-3 flex items-center gap-4">
              <Label htmlFor="isDraft" className="whitespace-nowrap">
                {t("common.draft")}
              </Label>
              <Switch
                id="isDraft"
                name="isDraft"
                className="data-[state=checked]:bg-blue-400"
                checked={formData.isDraft}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isDraft: checked })
                }
              />
            </div>

            {/* Delete Button - 3 columns (only in edit mode) */}
            {isEdit && (
              <div className="md:col-span-3 flex items-center gap-4">
                <Label htmlFor="isDeleted" className="whitespace-nowrap">
                  {t("button.delete")}
                </Label>
                <Switch
                  id="isDeleted"
                  name="isDeleted"
                  className="data-[state=checked]:bg-blue-400"
                  checked={formData.isDeleted}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDeleted: checked })
                  }
                />
              </div>
            )}

            {/* Default Switch - 3 columns */}
            <div className="md:col-span-3 flex items-center gap-4">
              <Label htmlFor="isDefault" className="whitespace-nowrap">
                {t("common.default")}
              </Label>
              <Switch
                id="isDefault"
                name="isDefault"
                className="data-[state=checked]:bg-blue-400"
                checked={formData.isDefault}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isDefault: checked })
                }
              />
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border mx-4 py-4 px-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Left side - 8 columns */}
          <div className="md:col-span-8 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="keepCreating"
                checked={keepCreating}
                className="data-[state=checked]:bg-blue-400"
                onCheckedChange={(checked) => setKeepCreating(!!checked)}
              />
              <Label
                htmlFor="keepCreating"
                className="cursor-pointer whitespace-nowrap"
              >
                {t("button.keep")}
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch id="print" className="data-[state=checked]:bg-blue-400" />
              <Label
                htmlFor="print"
                className="cursor-pointer whitespace-nowrap"
              >
                {t("button.print")}
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch id="pdf" className="data-[state=checked]:bg-blue-400" />
              <Label htmlFor="pdf" className="cursor-pointer whitespace-nowrap">
                {t("button.pdf")}
              </Label>
            </div>
          </div>

          {/* Right side - 4 columns */}
          <div className="md:col-span-4 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={handleReset}
              type="button"
              className="rounded-full cursor-pointer hover:bg-blue-600 hover:text-white"
            >
              {t("button.reset")}
            </Button>
            <Button
              type="submit"
              className="bg-blue-300 hover:bg-blue-600 text-white rounded-full cursor-pointer"
              onClick={() => formRef.current?.requestSubmit()}
            >
              {t("button.submit")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
