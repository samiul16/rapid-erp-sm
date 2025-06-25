import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
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

type AreaData = {
  id?: string;
  name: string;
  countryCode: string;
  stateId: string;
  cityId: string;
  description: string;
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
};

type StateOption = {
  id: string;
  name: string;
  countryCode: string;
};

type CityOption = {
  id: string;
  name: string;
  stateId: string;
};

const MOCK_COUNTRIES: CountryOption[] = [
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "IN", name: "India", flag: "🇮🇳" },
];

const MOCK_STATES: StateOption[] = [
  { id: "1", name: "California", countryCode: "US" },
  { id: "2", name: "Texas", countryCode: "US" },
  { id: "3", name: "Dubai", countryCode: "AE" },
  { id: "4", name: "Maharashtra", countryCode: "IN" },
];

const MOCK_CITIES: CityOption[] = [
  { id: "1", name: "Los Angeles", stateId: "1" },
  { id: "2", name: "San Francisco", stateId: "1" },
  { id: "3", name: "Houston", stateId: "2" },
  { id: "4", name: "Dubai City", stateId: "3" },
  { id: "5", name: "Mumbai", stateId: "4" },
];

const defaultAreaData: AreaData = {
  name: "",
  countryCode: "",
  stateId: "",
  cityId: "",
  description: "",
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
};

type Props = {
  isEdit?: boolean;
  initialData?: AreaData;
};

export default function AreaCreateEdit({ isEdit = false, initialData }: Props) {
  const { t, i18n } = useTranslation();
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AreaData>(
    initialData || defaultAreaData
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
      stateId: "", // Reset state when country changes
      cityId: "", // Reset city when country changes
    });
  };

  const handleStateChange = (value: string) => {
    setFormData({
      ...formData,
      stateId: value,
      cityId: "", // Reset city when state changes
    });
  };

  const handleCityChange = (value: string) => {
    setFormData({
      ...formData,
      cityId: value,
    });
  };

  const getSelectedCountry = () => {
    return MOCK_COUNTRIES.find((c) => c.code === formData.countryCode);
  };

  const getSelectedState = () => {
    return MOCK_STATES.find((s) => s.id === formData.stateId);
  };

  const getSelectedCity = () => {
    return MOCK_CITIES.find((c) => c.id === formData.cityId);
  };

  const getFilteredStates = () => {
    if (!formData.countryCode) return [];
    return MOCK_STATES.filter(
      (state) => state.countryCode === formData.countryCode
    );
  };

  const getFilteredCities = () => {
    if (!formData.stateId) return [];
    return MOCK_CITIES.filter((city) => city.stateId === formData.stateId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Area form submitted:", formData);
    // Add your submission logic here
  };

  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData(defaultAreaData);
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
              {isEdit ? t("form.editingArea") : t("form.creatingArea")}
            </h1>
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-blue-400 hover:bg-blue-600 text-white cursor-pointer"
              onClick={() => navigate("/areas")}
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
          {/* First Row: Area, Country, State, City */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            {/* Area Name - 3 columns */}
            <div className="md:col-span-3 space-y-1">
              <Label htmlFor="name">{t("form.area")}</Label>
              <EditableInput
                id="name"
                name="name"
                className="h-10"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("form.areaNamePlaceholder")}
                required
                onNext={() => formRef.current?.requestSubmit()}
                onCancel={() => formRef.current?.reset()}
              />
            </div>

            {/* Country Dropdown - 3 columns */}
            <div className="md:col-span-3 space-y-1">
              <Label htmlFor="countryCode">{t("form.country")}</Label>
              <Select
                value={formData.countryCode}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger
                  className="h-10 w-full md:w-[300px]"
                  id="countryCode"
                >
                  {" "}
                  {/* Added width classes */}
                  <SelectValue placeholder={t("form.selectCountry")}>
                    {formData.countryCode && getSelectedCountry() ? (
                      <div className="flex items-center gap-2">
                        <span>{getSelectedCountry()?.flag}</span>
                        <span>{getSelectedCountry()?.name}</span>
                      </div>
                    ) : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="w-[300px]">
                  {" "}
                  {/* Added width class */}
                  {MOCK_COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* State Dropdown - 3 columns */}
            <div className="md:col-span-3 space-y-1">
              <Label htmlFor="stateId">{t("form.state")}</Label>
              <Select
                value={formData.stateId}
                onValueChange={handleStateChange}
                disabled={!formData.countryCode}
              >
                <SelectTrigger
                  className="h-10 w-full md:w-[300px]"
                  id="stateId"
                >
                  {" "}
                  {/* Added width classes */}
                  <SelectValue placeholder={t("form.selectState")}>
                    {formData.stateId && getSelectedState() ? (
                      <span>{getSelectedState()?.name}</span>
                    ) : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="w-[300px]">
                  {" "}
                  {/* Added width class */}
                  {getFilteredStates().map((state) => (
                    <SelectItem key={state.id} value={state.id}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Dropdown - 3 columns */}
            <div className="md:col-span-3 space-y-1">
              <Label htmlFor="cityId">{t("form.city")}</Label>
              <Select
                value={formData.cityId}
                onValueChange={handleCityChange}
                disabled={!formData.stateId}
              >
                <SelectTrigger className="h-10 w-full md:w-[300px]" id="cityId">
                  {" "}
                  {/* Added width classes */}
                  <SelectValue placeholder={t("form.selectCity")}>
                    {formData.cityId && getSelectedCity() ? (
                      <span>{getSelectedCity()?.name}</span>
                    ) : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="w-[300px]">
                  {" "}
                  {/* Added width class */}
                  {getFilteredCities().map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Second Row: Description */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            <div className="md:col-span-12 space-y-1">
              <Label htmlFor="description">{t("form.description")}</Label>
              <EditableInput
                id="description"
                name="description"
                className="h-20"
                value={formData.description}
                onChange={handleChange}
                placeholder={t("form.descriptionPlaceholder")}
                onNext={() => formRef.current?.requestSubmit()}
                onCancel={() => formRef.current?.reset()}
              />
            </div>
          </div>

          {/* Third Row: Active, Default, Draft, Delete */}
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
