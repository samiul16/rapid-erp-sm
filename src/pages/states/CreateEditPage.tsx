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
  const { t } = useTranslation();
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

  const handleNext = () => {
    // setIsOptionModalOpen(true);
  };

  const handleCancel = () => {
    // setIsOptionModalOpen(false);
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
    <div className="relative w-full">
      {/* Container with full height minus external footer */}
      <div className="flex flex-col h-[calc(100vh-160px)] overflow-hidden border rounded shadow bg-white dark:bg-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <YoutubeButton videoId="PcVAyB3nDD4" />
            <h1 className="text-xl font-bold text-blue-400">
              {isEdit ? t("form.editingState") : t("form.creatingState")}
            </h1>
          </div>
          <Button
            variant="outline"
            className="gap-2 bg-blue-400 hover:bg-blue-600 text-white rounded-full"
            onClick={() => navigate("/states")}
          >
            {t("button.list")}
          </Button>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <form ref={formRef} onSubmit={handleSubmit}>
            {/* First Row: Name, Country, Code */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 space-y-2">
                <Label htmlFor="name" className="block">
                  {t("form.name")}
                </Label>
                <EditableInput
                  id="name"
                  name="name"
                  className="w-full h-10"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("form.namePlaceholder")}
                  onNext={handleNext}
                  onCancel={handleCancel}
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="countryCode" className="block">
                  {t("form.country")}
                </Label>
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

              <div className="md:col-span-6 space-y-2">
                <Label htmlFor="code" className="block">
                  {t("form.description")}
                </Label>
                <EditableInput
                  id="code"
                  name="code"
                  className="w-full h-10"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder={t("form.descriptionPlaceholder")}
                  onNext={handleNext}
                  onCancel={handleCancel}
                  required
                />
              </div>
            </div>

            {/* Second Row: Active, Draft, Delete, Default */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-3 space-y-2">
                <Label htmlFor="isActive" className="block">
                  {t("common.active")}
                </Label>
                <div className="h-10 flex items-center">
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
              </div>

              <div className="md:col-span-3 space-y-2">
                <Label htmlFor="isDraft" className="block">
                  {t("common.draft")}
                </Label>
                <div className="h-10 flex items-center">
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
              </div>

              {isEdit && (
                <div className="md:col-span-3 space-y-2">
                  <Label htmlFor="isDeleted" className="block">
                    {t("button.delete")}
                  </Label>
                  <div className="h-10 flex items-center">
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
                </div>
              )}

              <div className="md:col-span-3 space-y-2">
                <Label htmlFor="isDefault" className="block">
                  {t("common.default")}
                </Label>
                <div className="h-10 flex items-center">
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
            </div>
          </form>
        </div>

        {/* Fixed Bottom Button Bar */}
        <div className="sticky bottom-0 z-30 bg-white dark:bg-gray-800 border-t px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <Switch
                  checked={keepCreating}
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={setKeepCreating}
                />
                <span className="dark:text-gray-200">{t("button.keep")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch className="data-[state=checked]:bg-blue-400" />
                <span className="dark:text-gray-200">Print</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch className="data-[state=checked]:bg-blue-400" />
                <span className="dark:text-gray-200">PDF</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2 text-white bg-blue-400 hover:bg-blue-600 rounded-full"
                onClick={handleReset}
              >
                {t("button.reset")}
              </Button>
              <Button
                variant="outline"
                className="gap-2 text-white bg-blue-400 hover:bg-blue-600 rounded-full"
                onClick={() => formRef.current?.requestSubmit()}
              >
                {t("button.submit")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
