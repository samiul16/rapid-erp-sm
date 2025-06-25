import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import YoutubeButton from "@/components/common/YoutubeButton";
import EditableInput from "@/components/common/EditableInput";
import { useNavigate } from "react-router-dom";

type UserData = {
  name: string;
  isActive: boolean;
  isInactive: boolean;
  isDeleted: boolean;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
  avatar: string | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: UserData = {
  name: "John Doe",
  isActive: true,
  isInactive: false,
  isDeleted: false,
  isDraft: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  avatar: null,
};

export default function UserCreateEditPage({ isEdit = false }: Props) {
  const { t, i18n } = useTranslation();
  const [keepCreating, setKeepCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<UserData>({
    name: "",
    isActive: true,
    isInactive: false,
    isDeleted: false,
    isDraft: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    avatar: null,
  });

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
        avatar: null,
      });
      if (initialData.avatar) {
        setImagePreview(initialData.avatar);
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
      handleImageFile(files[0]);
    }
  };

  // Handle image file selection
  const handleImageFile = (file: File) => {
    if (file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setFormData({ ...formData, avatar: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload via file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
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
        name: "",
        isActive: true,
        isInactive: false,
        isDeleted: false,
        isDraft: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        avatar: null,
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
              {isEdit ? t("form.editingUser") : t("form.creatingUser")}
            </h1>
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-blue-400 hover:bg-blue-600 text-white cursor-pointer"
              onClick={() => navigate("/users")}
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
          {/* First Row: Name */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t("form.userName")}</Label>
              <EditableInput
                id="name"
                name="name"
                className="h-10"
                value={formData.name}
                onChange={handleChange}
                onNext={() => {
                  document.getElementById("isActive")?.focus();
                }}
                onCancel={() => {
                  setFormData({ ...formData, name: "" });
                }}
                placeholder={t("form.userNamePlaceholder")}
                required
              />
            </div>
          </div>

          {/* Second Row: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-center">
            {/* Active Switch */}
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

            {/* Inactive Switch */}
            <div className="md:col-span-3 flex items-center gap-4">
              <Label htmlFor="isInactive" className="whitespace-nowrap">
                {t("common.inactive")}
              </Label>
              <Switch
                id="isInactive"
                name="isInactive"
                className="data-[state=checked]:bg-blue-400"
                checked={formData.isInactive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isInactive: checked })
                }
              />
            </div>

            {/* Delete Switch */}
            <div className="md:col-span-3 flex items-center gap-4">
              <Label htmlFor="isDeleted" className="whitespace-nowrap">
                {t("common.delete")}
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

            {/* Draft Switch */}
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
          </div>

          {/* Third Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label>{t("common.createdAt")}</Label>
              <div className="p-2 border rounded-md text-sm">
                {new Date(formData.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("common.updatedAt")}</Label>
              <div className="p-2 border rounded-md text-sm">
                {new Date(formData.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Fourth Row: Avatar Upload */}
          <div className="grid grid-cols-1 gap-4">
            <Label>{t("form.userAvatar")}</Label>
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
                    alt={t("form.avatarPreview")}
                    className="w-40 h-28 object-contain rounded-md"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      setFormData({ ...formData, avatar: null });
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
                id="avatar"
                name="avatar"
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
          {/* Left side - Additional options */}
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

          {/* Right side - Action buttons */}
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
