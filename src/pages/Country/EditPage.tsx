import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Upload,
  X,
  Trash2,
  Undo2,
  MoreVertical,
  // Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EditableInput from "@/components/common/EditableInput";
import { Autocomplete, Modal } from "@mantine/core";
import { SplitButton } from "@/components/common/SplitButton";
import VideoModal from "@/components/common/VideoModal";
import video from "@/assets/videos/test.mp4";

type CountryData = {
  code: string;
  title: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  rating: number;
  flag: string | null;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  callingCode: string;
  isDeleted: boolean;
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
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  callingCode: "+971",
  isDeleted: false,
};
const MOCK_COUNTRIES = [
  { code: "US", name: "United States", callingCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", callingCode: "+44", flag: "🇬🇧" },
  { code: "AE", name: "United Arab Emirates", callingCode: "+971", flag: "🇦🇪" },
  { code: "IN", name: "India", callingCode: "+91", flag: "🇮🇳" },
];

// Type definition for TypeScript
export type HistoryEntry = {
  id: string;
  date: string;
  user: string;
  status: "Active" | "InActive" | "Delete" | "Draft";
  export: "Single" | "Bulk";
  pdf: boolean;
  csv: boolean;
  xls: boolean;
  doc: boolean;
  print: boolean;
};

const COUNTRY_DATA = MOCK_COUNTRIES.map((country) => country.code);

export default function EditPage({ isEdit = false }: Props) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [keepCreating, setKeepCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  // Form state
  const [formData, setFormData] = useState<CountryData>({
    code: "",
    title: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    rating: 3,
    flag: null,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    callingCode: "",
    isDeleted: false,
  });

  // Initialize with edit data if available
  useEffect(() => {
    if (initialData.flag) {
      setImagePreview(initialData.flag);
    }
  }, [initialData]);

  useEffect(() => {
    if (id && id !== "undefined") {
      const fetchedData = initialData;
      setFormData(fetchedData);

      if (fetchedData.flag) {
        setImagePreview(fetchedData.flag);
      }

      setSelectedCountry(fetchedData.code);
    }
  }, [id]);

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
        setFormData({ ...formData, flag: e.target?.result as string });
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
        code: "",
        title: "",
        isDefault: false,
        isActive: true,
        isDraft: false,
        rating: 3,
        flag: null,
        createdAt: new Date(),
        draftedAt: null,
        updatedAt: new Date(),
        deletedAt: null,
        callingCode: "",
        isDeleted: false,
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

  const getRelativeTime = (dateString: string | null | Date) => {
    if (!dateString) return "--/--/----";

    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years}y ago`;
    } else if (months > 0) {
      return `${months}mo ago`;
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <div className="relative w-[calc(100vw-150px)]">
      {/* Container with full height minus external footer */}
      <div className="flex flex-col h-[82vh] overflow-hidden border rounded shadow bg-white dark:bg-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2">
            <VideoModal src={video} header={"Rapid ERP Video"} />
            <h1 className="text-xl font-bold text-blue-300">
              {isEdit ? t("form.editingCountry") : t("form.creatingCountry")}
            </h1>
          </div>
          {/* <Button
            variant="outline"
            className="gap-2 bg-blue-400 hover:bg-blue-600 text-white rounded-full"
            onClick={() => navigate("/countries")}
          >
            {t("button.list")}
          </Button> */}

          <SplitButton
            listPath="/countries"
            popoverOptions={[
              {
                label: isEdit ? "Create" : "Edit",
                // icon: <Plus className="h-4 w-4 text-primary" />,
                path: "/countries/create",
              },
              {
                label: "View",
                // icon: <Eye className="h-4 w-4 text-green-500" />,
                path: "/countries/view",
              },
            ]}
          />
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* First Row: Code, Calling Code, Country */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3 space-y-2">
                <h3 className="font-medium mb-1">Code</h3>
                <Autocomplete
                  data={COUNTRY_DATA}
                  value={selectedCountry}
                  onChange={(value) => {
                    setSelectedCountry(value);
                    setFormData({
                      ...initialData,
                      code: value,
                    });
                  }}
                  placeholder="Select a country..."
                  display="name"
                  disabled={false}
                  className="w-full"
                  styles={{
                    input: {
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <h3 className="font-medium mb-1">{t("form.callingCode")}</h3>
                <EditableInput
                  id="callingCode"
                  name="callingCode"
                  className="w-full h-10"
                  value={formData.callingCode}
                  onChange={handleChange}
                  // placeholder="+1"
                  onNext={() => setIsOptionModalOpen(true)}
                  onCancel={() => setIsOptionModalOpen(false)}
                  required
                />
              </div>

              <div className="md:col-span-5 space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">{t("form.country")}</h3>
                  <MoreVertical
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => setIsOptionModalOpen(true)}
                  />
                </div>
                <EditableInput
                  id="title"
                  name="title"
                  className="w-full h-10"
                  value={formData.title}
                  onChange={handleChange}
                  // placeholder={t("form.countryNamePlaceholder")}
                  onNext={() => setIsOptionModalOpen(true)}
                  onCancel={() => setIsOptionModalOpen(false)}
                  required
                />
              </div>
            </div>

            {/* Second Row: Default, Draft, Active, Delete */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 space-y-2">
                <h3 className="font-medium mb-1">{t("common.default")}</h3>
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

              <div className="md:col-span-3 space-y-2">
                <h3 className="font-medium mb-1">{t("common.active")}</h3>
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
                <h3 className="font-medium mb-1">{t("common.draft")}</h3>
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

              <div className="md:col-span-3 space-y-2">
                <h3 className="font-medium mb-1">
                  {formData.isDeleted
                    ? t("button.restore")
                    : t("button.delete")}
                </h3>
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
                      <Undo2 className="text-green-500" />
                    ) : (
                      <Trash2 className="text-red-500" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Third Row: Dates */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <h3 className="font-medium mb-1">Created</h3>
                <p>{getRelativeTime(formData.createdAt)}</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-medium mb-1">Updated</h3>
                <p>{getRelativeTime(formData.updatedAt)}</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-medium mb-1">Drafted</h3>
                <p>{getRelativeTime(formData.draftedAt)}</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-medium mb-1">Deleted</h3>
                <p>{getRelativeTime(formData.deletedAt)}</p>
              </div>
            </div>

            {/* Flag Upload */}
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.flag")}</h3>

              {/* Show existing image if available */}
              {imagePreview && (
                <div className="relative inline-block mb-4">
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
              )}

              {/* Drag-and-drop uploader */}
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
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    {t("form.dragDropImage")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t("form.orClickToSelect")}
                  </p>
                </div>

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
        <div className="sticky bottom-0 z-30 bg-white dark:bg-gray-800 border-t px-6 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)]">
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
                <span className="dark:text-gray-200">PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch className="data-[state=checked]:bg-blue-400" />
                <span className="dark:text-gray-200">Print</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2 text-primary rounded-full"
                onClick={handleReset}
              >
                {t("button.reset")}
              </Button>
              <Button
                variant="outline"
                className="gap-2 text-primary rounded-full"
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
