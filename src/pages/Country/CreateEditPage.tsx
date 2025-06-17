import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  FileText,
  Printer,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { StarRating } from "@/components/ui/star-rating";
import YoutubeButton from "@/components/common/YoutubeButton";

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
};

export default function CountryFormPage({ isEdit = false }: Props) {
  const { t, i18n } = useTranslation();
  const [keepCreating, setKeepCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  // Handle image upload
  const handleImageChange = () => {
    // const file = e.target.files?.[0];
    // if (file) {
    //   setFormData({ ...formData, flag: URL.createObjectURL(file) });
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setImagePreview(reader.result as string);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle rating change
  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating });
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
      });
      setImagePreview(null);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  // Arabic translations for footer buttons
  const footerButtons = {
    keepCreating:
      i18n.language === "ar" ? "الاستمرار في الإنشاء" : "Keep Creating",
    print: i18n.language === "ar" ? "طباعة" : "Print",
    pdf: i18n.language === "ar" ? "PDF" : "PDF",
    reset: i18n.language === "ar" ? "إعادة تعيين" : "Reset",
    submit: i18n.language === "ar" ? "إرسال" : "Submit",
  };

  return (
    <div
      className="container mx-auto px-4 py-6"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t("button.back")}
        </Button>

        <div className="flex gap-2 items-center">
          <YoutubeButton videoId="your-video-id" />
          <h1 className="text-xl font-bold">
            {isEdit ? t("form.editCountry") : t("form.createCountry")}
          </h1>
        </div>
      </div>

      {/* Main Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            {/* Country Code */}
            <div className="space-y-2">
              <Label htmlFor="code">{t("form.countryCode")}</Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                maxLength={3}
                className="w-full"
                placeholder="US"
              />
            </div>

            {/* Country Name */}
            <div className="space-y-2">
              <Label htmlFor="title">{t("form.countryName")}</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full"
                placeholder={t("form.countryNamePlaceholder")}
              />
            </div>

            {/* Rating - Moved up from right column */}
            <div className="flex items-start space-y-4">
              <Label>{t("form.rating")} :</Label>
              <StarRating
                rating={formData.rating}
                onRatingChange={handleRatingChange}
                editable={true}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-start space-x-4">
                <Label htmlFor="isDefault">{t("common.default")}</Label>
                <Switch
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDefault: checked })
                  }
                />
              </div>
              <div className="flex items-start space-x-4">
                <Label htmlFor="isActive">{t("common.active")}</Label>
                <Switch
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
              </div>
              <div className="flex items-start space-x-4">
                <Label htmlFor="isDraft">{t("common.draft")}</Label>
                <Switch
                  id="isDraft"
                  name="isDraft"
                  checked={formData.isDraft}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDraft: checked })
                  }
                />
              </div>
            </div>
          </div>

          {/* Right Column - Image and Status Switches */}
          <div className="space-y-6">
            {/* Flag Image Upload */}
            <div className="space-y-4">
              <Label>{t("form.countryFlag")}</Label>
              <div className="flex flex-col items-center gap-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt={t("form.flagPreview")}
                      className="w-40 h-28 object-contain border rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData({ ...formData, flag: null });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-40 h-28 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <Input
                  id="flag"
                  name="flag"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <Label
                  htmlFor="flag"
                  className="cursor-pointer px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  {imagePreview ? t("form.changeImage") : t("form.uploadImage")}
                </Label>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center pt-16 gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="keepCreating"
              checked={keepCreating}
              onCheckedChange={(checked) => setKeepCreating(!!checked)}
            />
            <Label htmlFor="keepCreating" className="cursor-pointer">
              {footerButtons.keepCreating}
            </Label>
          </div>

          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.print()}
              type="button"
            >
              <Printer className="h-4 w-4" />
              {footerButtons.print}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => console.log("Export PDF")}
              type="button"
            >
              <FileText className="h-4 w-4" />
              {footerButtons.pdf}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleReset}
              type="button"
            >
              <Trash2 className="h-4 w-4" />
              {footerButtons.reset}
            </Button>
            <Button
              type="submit"
              size="sm"
              className="gap-2"
              onClick={() => formRef.current?.requestSubmit()}
            >
              <Save className="h-4 w-4" />
              {footerButtons.submit}
            </Button>
          </div>
        </div>
      </form>

      {/* Footer Actions */}
      {/* <div className="sticky bottom-0 bg-white border-t py-4 px-6 shadow-sm">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="keepCreating"
              checked={keepCreating}
              onCheckedChange={(checked) => setKeepCreating(!!checked)}
            />
            <Label htmlFor="keepCreating" className="cursor-pointer">
              {footerButtons.keepCreating}
            </Label>
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.print()}
              type="button"
            >
              <Printer className="h-4 w-4" />
              {footerButtons.print}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => console.log("Export PDF")}
              type="button"
            >
              <FileText className="h-4 w-4" />
              {footerButtons.pdf}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleReset}
              type="button"
            >
              <Trash2 className="h-4 w-4" />
              {footerButtons.reset}
            </Button>
            <Button
              type="submit"
              size="sm"
              className="gap-2"
              onClick={() => formRef.current?.requestSubmit()}
            >
              <Save className="h-4 w-4" />
              {footerButtons.submit}
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
