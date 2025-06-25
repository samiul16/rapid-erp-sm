import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import YoutubeButton from "@/components/common/YoutubeButton";
import EditableInput from "@/components/common/EditableInput";
import { useNavigate } from "react-router-dom";

type CountryData = {
  code: string;
  title: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  rating: number;
  flag: string | null;
  createdAt: string;
  updatedAt: string;
  callingCode: string;
};

type Props = {
  isEdit?: boolean;
};

const initialData: CountryData = {
  code: "US",
  title: "United States of America",
  isDefault: false,
  isActive: true,
  isDraft: false,
  rating: 3,
  flag: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  callingCode: "+971",
};

export default function CountryFormPage({ isEdit = false }: Props) {
  const { t, i18n } = useTranslation();
  const [keepCreating, setKeepCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    rating: 3,
    flag: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    callingCode: "",
  });

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
        flag: null,
      });
      if (initialData.flag) {
        setImagePreview(initialData.flag);
      }
    }
  }, [isEdit, initialData]);

  // Handle drag events
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
      handleImageFile();
    }
  };

  // Handle image file selection
  const handleImageFile = () => {
    // if (file.type.match('image.*')) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     setImagePreview(e.target?.result as string);
    //     setFormData({ ...formData, flag: e.target?.result as string });
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  // Handle image upload via file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile();
    }
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
        code: "",
        title: "",
        isDefault: false,
        isActive: true,
        isDraft: false,
        rating: 3,
        flag: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        callingCode: "",
      });
      setImagePreview(null);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <div className="flex gap-2 items-center">
              <YoutubeButton videoId="your-video-id" />
              <h1 className="text-xl font-bold text-blue-400">
                {isEdit ? t("form.editingCountry") : t("form.creatingCountry")}
              </h1>
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 p-5 bg-blue-400 hover:bg-blue-600 text-white cursor-pointer rounded-full"
                onClick={() => navigate("/countries")}
              >
                {t("button.list")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div
          className="container mx-auto px-4 py-6"
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm border p-6 mb-6 dark:bg-gray-800 dark:border-gray-700"
          >
            {/* First Row: Code, Country, Default */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-end">
              {/* Country Code - 3 columns */}
              <div className="md:col-span-3 space-y-1">
                <Label htmlFor="code">{t("form.countryCode")}</Label>
                <EditableInput
                  id="code"
                  name="code"
                  className="h-10"
                  value={formData.code}
                  onChange={handleChange}
                  onNext={() => {
                    document.getElementById("title")?.focus();
                  }}
                  onCancel={() => {
                    setFormData({ ...formData, code: "" });
                  }}
                  placeholder="US"
                  maxLength={3}
                  required
                />
              </div>
              <div className="md:col-span-3 flex items-center gap-4">
                <div className="md:col-span-3 space-y-2">
                  <Label htmlFor="callingCode">{t("form.callingCode")}</Label>
                  <EditableInput
                    id="callingCode"
                    name="callingCode"
                    className="h-10"
                    value={formData.callingCode}
                    onChange={handleChange}
                    onNext={() => {
                      document.getElementById("title")?.focus();
                    }}
                    onCancel={() => {
                      setFormData({ ...formData, code: "" });
                    }}
                    placeholder="US"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
              {/* Country Name - 6 columns */}
              <div className="md:col-span-6 space-y-2">
                <Label htmlFor="title">{t("form.countryName")}</Label>
                <EditableInput
                  id="title"
                  name="title"
                  className="h-10"
                  value={formData.title}
                  onChange={handleChange}
                  onNext={() => {
                    document.getElementById("isActive")?.focus();
                  }}
                  onCancel={() => {
                    setFormData({ ...formData, title: "" });
                  }}
                  placeholder={t("form.countryNamePlaceholder")}
                  required
                />
              </div>
            </div>

            {/* Second Row: Active, Draft, Delete, Rating */}
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
              <div className="md:col-span-3 flex items-center gap-4">
                <Label htmlFor="isDeleted" className="whitespace-nowrap">
                  {t("button.delete")}
                </Label>
                <Switch
                  id="isDeleted"
                  name="isDeleted"
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={() => setFormData({ ...formData })}
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
            </div>

            {/* Third Row: Flag Image Upload with Drag and Drop - Full width */}
            <div className="grid grid-cols-1 gap-4">
              <Label>{t("form.countryFlag")}</Label>
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
                      alt={t("form.flagPreview")}
                      className="w-40 h-28 object-contain rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        setFormData({ ...formData, flag: null });
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
                  id="flag"
                  name="flag"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

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
              <div className="md:col-span-3 flex items-center gap-4">
                <Label htmlFor="isDeleted" className="whitespace-nowrap">
                  {t("button.delete")}
                </Label>
                <Switch
                  id="isDeleted"
                  name="isDeleted"
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={() => setFormData({ ...formData })}
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
            </div>

            {/* Third Row: Flag Image Upload with Drag and Drop - Full width */}
            <div className="grid grid-cols-1 gap-4">
              <Label>{t("form.countryFlag")}</Label>
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
                      alt={t("form.flagPreview")}
                      className="w-40 h-28 object-contain rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        setFormData({ ...formData, flag: null });
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
                  id="flag"
                  name="flag"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

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
              <div className="md:col-span-3 flex items-center gap-4">
                <Label htmlFor="isDeleted" className="whitespace-nowrap">
                  {t("button.delete")}
                </Label>
                <Switch
                  id="isDeleted"
                  name="isDeleted"
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={() => setFormData({ ...formData })}
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
            </div>

            {/* Third Row: Flag Image Upload with Drag and Drop - Full width */}
            <div className="grid grid-cols-1 gap-4">
              <Label>{t("form.countryFlag")}</Label>
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
                      alt={t("form.flagPreview")}
                      className="w-40 h-28 object-contain rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        setFormData({ ...formData, flag: null });
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
                  id="flag"
                  name="flag"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="sticky bottom-0 bg-white border-t py-4 px-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
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
                {isEdit ? t("button.keep") : t("button.keep")}
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

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={handleReset}
              type="button"
              className="rounded-full"
            >
              {t("button.reset")}
            </Button>
            <Button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 text-white rounded-full"
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
