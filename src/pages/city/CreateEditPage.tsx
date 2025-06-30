/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X, Trash2, Undo, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import YoutubeButton from "@/components/common/YoutubeButton";
import EditableInput from "@/components/common/EditableInput";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Modal } from "@mantine/core";
import { format } from "date-fns";

type CityData = {
  draftedAt: Date;
  deletedAt: Date;
  id?: string;
  name: string;
  countryCode: string;
  stateCode: string;
  description: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
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
];

const MOCK_STATES: StateOption[] = [
  { code: "DXB", name: "Dubai", countryCode: "AE" },
  { code: "AUH", name: "Abu Dhabi", countryCode: "AE" },
  { code: "CA", name: "California", countryCode: "US" },
  { code: "NY", name: "New York", countryCode: "US" },
];

const defaultCityData: CityData = {
  draftedAt: new Date(),
  deletedAt: new Date(),
  name: "",
  countryCode: "",
  stateCode: "",
  description: "",
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function CityForm({
  isEdit = false,
  initialData,
}: {
  isEdit?: boolean;
  initialData?: CityData;
}) {
  const { t } = useTranslation();
  const [keepChanges, setKeepChanges] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CityData>(
    initialData || defaultCityData
  );

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData(initialData);
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    }
  }, [isEdit, initialData]);

  const handleCountryChange = (value: string) => {
    setFormData({
      ...formData,
      countryCode: value,
      stateCode: "",
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
    return MOCK_STATES.filter(
      (state) => state.countryCode === formData.countryCode
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setFormData({ ...formData, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData(defaultCityData);
      setImagePreview(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragEvents = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }
  };

  // Handle date selection
  const handleDateSelect = (date: Date | undefined, field: keyof CityData) => {
    if (date) {
      setFormData({
        ...formData,
        [field]: date,
      });
    }
  };

  // Format date for display
  const formatDateDisplay = (date: Date | null) => {
    return date ? format(date, "dd/MM/yyyy") : "--/--/----";
  };

  const handleDrop = (e: React.DragEvent) => {
    handleDragEvents(e);
    const file = e.dataTransfer.files[0];
    if (file?.type.match("image.*")) {
      handleImageChange({ target: { files: [file] } } as any);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col h-[calc(100vh-160px)] overflow-hidden border rounded shadow bg-white dark:bg-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <YoutubeButton videoId="PcVAyB3nDD4" />
            <h1 className="text-xl font-bold text-blue-400">
              {isEdit ? t("form.editingCity") : t("form.creatingCity")}
            </h1>
          </div>
          <Button
            variant="outline"
            className="gap-2 bg-blue-400 hover:bg-blue-600 text-white rounded-full"
            onClick={() => navigate("/cities")}
          >
            {t("button.list")}
          </Button>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <form ref={formRef} onSubmit={handleSubmit}>
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 space-y-2">
                <Label htmlFor="name" className="block">
                  {t("form.cityName")}
                </Label>
                <EditableInput
                  id="name"
                  name="name"
                  className="w-full h-10"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("form.cityNamePlaceholder")}
                  onNext={() => console.log("Next")}
                  onCancel={() => setFormData({ ...formData, name: "" })}
                  required
                />
              </div>

              <div className="md:col-span-4 space-y-2">
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
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-4 space-y-2">
                <Label htmlFor="stateCode" className="block">
                  {t("form.state")}
                </Label>
                <Select
                  value={formData.stateCode}
                  onValueChange={handleStateChange}
                  disabled={!formData.countryCode}
                >
                  <SelectTrigger className="h-10" id="stateCode">
                    <SelectValue placeholder={t("form.selectState")}>
                      {formData.stateCode
                        ? MOCK_STATES.find((s) => s.code === formData.stateCode)
                            ?.name
                        : t("form.selectState")}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredStates().map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description Row */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="description" className="block">
                  {t("form.description")}
                </Label>
                <EditableInput
                  id="description"
                  name="description"
                  className="w-full h-10"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={t("form.descriptionPlaceholder")}
                  onNext={() => console.log("Next")}
                  onCancel={() => setFormData({ ...formData, description: "" })}
                />
              </div>
            </div>

            {/* Toggles Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
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
                  <Label className="block">
                    {formData.isDeleted
                      ? t("button.restore")
                      : t("button.delete")}
                  </Label>
                  <div className="h-10 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          isDeleted: !formData.isDeleted,
                        })
                      }
                    >
                      {formData.isDeleted ? (
                        <Undo className="text-green-500" />
                      ) : (
                        <Trash2 className="text-red-500" />
                      )}
                    </Button>
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

            {/* Third Row: Dates */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start mt-4">
              <div className="md:col-span-3 space-y-2">
                <Label className="block">{t("common.createdAt")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-10"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDateDisplay(formData.createdAt)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.createdAt || undefined}
                      onSelect={(date) => handleDateSelect(date, "createdAt")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="md:col-span-3 space-y-2">
                <Label className="block">{t("common.draftedAt")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-10"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDateDisplay(formData.draftedAt)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      onSelect={(date) => handleDateSelect(date, "draftedAt")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="md:col-span-3 space-y-2">
                <Label className="block">{t("common.updatedAt")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-10"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDateDisplay(formData.updatedAt)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.updatedAt || undefined}
                      onSelect={(date) => handleDateSelect(date, "updatedAt")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="md:col-span-3 space-y-2">
                <Label className="block">{t("common.deletedAt")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-10"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDateDisplay(formData.deletedAt)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.deletedAt || undefined}
                      onSelect={(date) => handleDateSelect(date, "deletedAt")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2 mt-4">
              <Label className="block">{t("form.cityImage")}</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onDragEnter={handleDragEvents}
                onDragLeave={handleDragEvents}
                onDragOver={handleDragEvents}
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
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
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
                  checked={keepChanges}
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={setKeepChanges}
                />
                <span className="dark:text-gray-200">
                  {t("button.keepChanges")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  className="data-[state=checked]:bg-blue-400"
                  onClick={() => console.log("PDF export")}
                />
                <span className="dark:text-gray-200">PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  className="data-[state=checked]:bg-blue-400"
                  onClick={() => window.print()}
                />
                <span className="dark:text-gray-200">Print</span>
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

      {/* Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Options"
        size="xl"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <div className="pt-5 pb-14 px-5">Modal Content</div>
      </Modal>
    </div>
  );
}
