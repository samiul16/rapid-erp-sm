import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X } from "lucide-react";
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

type CityData = {
  id?: string;
  name: string;
  countryCode: string;
  stateCode: string;
  description: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  rating: number;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

type CountryOption = {
  code: string;
  name: string;
  flag: string;
  callingCode: string;
};

type StateOption = {
  code: string;
  name: string;
  countryCode: string;
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

const MOCK_STATES: StateOption[] = [
  // United Arab Emirates
  { code: "DXB", name: "Dubai", countryCode: "AE" },
  { code: "AUH", name: "Abu Dhabi", countryCode: "AE" },
  { code: "SHJ", name: "Sharjah", countryCode: "AE" },

  // United States
  { code: "CA", name: "California", countryCode: "US" },
  { code: "NY", name: "New York", countryCode: "US" },
  { code: "TX", name: "Texas", countryCode: "US" },
  { code: "FL", name: "Florida", countryCode: "US" },

  // United Kingdom
  { code: "ENG", name: "England", countryCode: "GB" },
  { code: "SCT", name: "Scotland", countryCode: "GB" },
  { code: "WLS", name: "Wales", countryCode: "GB" },
  { code: "NIR", name: "Northern Ireland", countryCode: "GB" },

  // India
  { code: "MH", name: "Maharashtra", countryCode: "IN" },
  { code: "DL", name: "Delhi", countryCode: "IN" },
  { code: "KA", name: "Karnataka", countryCode: "IN" },
  { code: "TN", name: "Tamil Nadu", countryCode: "IN" },

  // Saudi Arabia
  { code: "RIY", name: "Riyadh Province", countryCode: "SA" },
  { code: "MAK", name: "Makkah Province", countryCode: "SA" },
  { code: "MED", name: "Madinah Province", countryCode: "SA" },

  // Pakistan
  { code: "PUN", name: "Punjab", countryCode: "PK" },
  { code: "SIN", name: "Sindh", countryCode: "PK" },
  { code: "KPK", name: "Khyber Pakhtunkhwa", countryCode: "PK" },

  // Egypt
  { code: "CAI", name: "Cairo", countryCode: "EG" },
  { code: "ALX", name: "Alexandria", countryCode: "EG" },
  { code: "LUX", name: "Luxor", countryCode: "EG" },

  // Canada
  { code: "ON", name: "Ontario", countryCode: "CA" },
  { code: "QC", name: "Quebec", countryCode: "CA" },
  { code: "BC", name: "British Columbia", countryCode: "CA" },

  // Australia
  { code: "NSW", name: "New South Wales", countryCode: "AU" },
  { code: "VIC", name: "Victoria", countryCode: "AU" },
  { code: "QLD", name: "Queensland", countryCode: "AU" },

  // France
  { code: "IDF", name: "Île-de-France", countryCode: "FR" },
  { code: "PACA", name: "Provence-Alpes-Côte d'Azur", countryCode: "FR" },
  { code: "ARA", name: "Auvergne-Rhône-Alpes", countryCode: "FR" },
];

const defaultCityData: CityData = {
  name: "",
  countryCode: "",
  stateCode: "",
  description: "",
  isDefault: false,
  isActive: true,
  isDraft: false,
  rating: 3,
  image: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

type Props = {
  isEdit?: boolean;
  initialData?: CityData;
};

export default function CityForm({ isEdit = false, initialData }: Props) {
  const { t, i18n } = useTranslation();
  const [keepCreating, setKeepCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CityData>(
    initialData || defaultCityData
  );

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
        image: null,
      });
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    }
  }, [isEdit, initialData]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageFile(files[0]);
    }
  };

  const handleImageFile = (file: File) => {
    if (file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setFormData({ ...formData, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

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
      stateCode: "", // Reset state when country changes
    });
  };

  const handleStateChange = (value: string) => {
    setFormData({
      ...formData,
      stateCode: value,
    });
  };

  const getSelectedCountry = () => {
    return MOCK_COUNTRIES.find((c) => c.code === formData.countryCode);
  };

  const getFilteredStates = () => {
    if (!formData.countryCode) return [];
    return MOCK_STATES.filter(
      (state) => state.countryCode === formData.countryCode
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("City form submitted:", formData);
    // Add your submission logic here
  };

  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData(defaultCityData);
      setImagePreview(null);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  console.log("isEdit", isEdit);

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
              {isEdit ? t("form.editingCity") : t("form.creatingCity")}
            </h1>
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-blue-400 hover:bg-blue-600 text-white cursor-pointer"
              onClick={() => navigate("/cities")}
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
          {/* First Row: Name, Country, State, Description */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            {/* City Name - 3 columns */}
            <div className="md:col-span-3 space-y-1">
              <Label htmlFor="name">{t("form.cityName")}</Label>
              <EditableInput
                id="name"
                name="name"
                className="h-10"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("form.cityNamePlaceholder")}
                onNext={() => {
                  document.getElementById("countryCode")?.focus();
                }}
                onCancel={() => {
                  setFormData({ ...formData, name: "" });
                }}
                required
              />
            </div>

            {/* Country Dropdown - 2 columns */}
            <div className="md:col-span-2 space-y-1">
              <Label htmlFor="countryCode">{t("form.country")}</Label>
              <Select
                value={formData.countryCode}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="h-10">
                  <SelectValue>
                    {isEdit && formData.countryCode ? (
                      <div className="flex items-center gap-2">
                        <span>{getSelectedCountry()?.flag}</span>
                        <span>{getSelectedCountry()?.name}</span>
                      </div>
                    ) : (
                      <span>{t("form.selectCountry")}</span>
                    )}
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

            {/* State Dropdown - 2 columns */}
            {/* State Dropdown - 2 columns */}
            <div className="md:col-span-2 space-y-1">
              <Label htmlFor="stateCode">{t("form.state")}</Label>
              <Select
                value={formData.stateCode}
                onValueChange={handleStateChange}
              >
                <SelectTrigger className="h-10">
                  <SelectValue>
                    {formData.stateCode
                      ? MOCK_STATES.find((s) => s.code === formData.stateCode)
                          ?.name || t("form.selectState")
                      : t("form.selectState")}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {getFilteredStates().length > 0 ? (
                    getFilteredStates().map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="py-2 px-3 text-sm text-muted-foreground">
                      {t("form.noStatesAvailable")}
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Description - 5 columns */}
            <div className="md:col-span-5 space-y-1">
              <Label htmlFor="description">{t("form.description")}</Label>
              <EditableInput
                id="description"
                name="description"
                className="h-10"
                value={formData.description}
                onChange={handleChange}
                placeholder={t("form.descriptionPlaceholder")}
                onNext={() => {
                  document.getElementById("countryCode")?.focus();
                }}
                onCancel={() => {
                  setFormData({ ...formData, description: "" });
                }}
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
                  onCheckedChange={() => console.log("Delete toggled")}
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

          {/* Third Row: City Image Upload with Drag and Drop - Full width */}
          <div className="grid grid-cols-1 gap-4">
            <Label>{t("form.cityImage")}</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt={t("form.imagePreview")}
                    className="w-40 h-28 object-contain rounded-md"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      setFormData({ ...formData, image: null });
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    {t("form.dragDropImage")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t("form.orClickToSelect")}
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
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
            <Button variant="outline" onClick={handleReset} type="button">
              {t("button.reset")}
            </Button>
            <Button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 text-white"
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
