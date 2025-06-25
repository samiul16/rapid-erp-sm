import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import YoutubeButton from "@/components/common/YoutubeButton";
import EditableInput from "@/components/common/EditableInput";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type UserMasterData = {
  name: string;
  mobileNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  status: "active" | "inactive";
  otp: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  createdAt: string;
  updatedAt: string;
  avatar: string | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: UserMasterData = {
  name: "John Doe",
  mobileNumber: "+1234567890",
  email: "john.doe@example.com",
  password: "password123",
  confirmPassword: "password123",
  status: "active",
  otp: "123456",
  facebook: "https://facebook.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  instagram: "https://instagram.com/johndoe",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  avatar: null,
};

export default function UserMasterCreateEditPage({ isEdit = false }: Props) {
  const { t, i18n } = useTranslation();
  const [keepCreating, setKeepCreating] = useState(false);
  const [, setImagePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //   const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<UserMasterData>({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: "active",
    otp: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    avatar: null,
  });

  // Validation errors
  const [errors, setErrors] = useState<Partial<UserMasterData>>({});

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

  // Handle image file selection
  //   const handleImageFile = (file: File) => {
  //     if (file.type.match("image.*")) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         setImagePreview(e.target?.result as string);
  //         setFormData({ ...formData, avatar: e.target?.result as string });
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  // Handle image upload via file input
  //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       handleImageFile(file);
  //     }
  //   };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof UserMasterData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Handle status change
  const handleStatusChange = (value: "active" | "inactive") => {
    setFormData({
      ...formData,
      status: value,
    });
  };

  // Handle phone number change
  const handlePhoneChange = (value: string | undefined) => {
    setFormData({
      ...formData,
      mobileNumber: value || "",
    });

    if (errors.mobileNumber) {
      setErrors({
        ...errors,
        mobileNumber: undefined,
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Partial<UserMasterData> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("validation.nameRequired");
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = t("validation.mobileRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("validation.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("validation.emailInvalid");
    }

    if (!formData.password.trim()) {
      newErrors.password = t("validation.passwordRequired");
    } else if (formData.password.length < 6) {
      newErrors.password = t("validation.passwordMinLength");
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = t("validation.confirmPasswordRequired");
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("validation.passwordsDoNotMatch");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle success (e.g., API call, navigation, etc.)
    }
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
        name: "",
        mobileNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        status: "active",
        otp: "",
        facebook: "",
        linkedin: "",
        instagram: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        avatar: null,
      });
      setImagePreview(null);
      setErrors({});
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  // Trigger file input click
  //   const triggerFileInput = () => {
  //     fileInputRef.current?.click();
  //   };

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
              {isEdit
                ? t("form.editingUserMaster")
                : t("form.creatingUserMaster")}
            </h1>
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-blue-400 hover:bg-blue-600 text-white cursor-pointer"
              onClick={() => navigate("/user-masters")}
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
          {/* First Row: Name and Mobile Number */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t("form.name")} *</Label>
              <EditableInput
                id="name"
                name="name"
                className={`h-10 ${errors.name ? "border-red-500" : ""}`}
                value={formData.name}
                onChange={handleChange}
                onNext={() => {
                  document.getElementById("mobileNumber")?.focus();
                }}
                onCancel={() => {
                  setFormData({ ...formData, name: "" });
                }}
                placeholder={t("form.namePlaceholder")}
                required
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobileNumber">{t("form.mobileNumber")} *</Label>
              <PhoneInput
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={handlePhoneChange}
                defaultCountry="US"
                international
                countryCallingCodeEditable={false}
                className={`phone-input ${
                  errors.mobileNumber ? "border-red-500" : ""
                }`}
                placeholder={t("form.mobileNumberPlaceholder")}
              />
              {errors.mobileNumber && (
                <p className="text-sm text-red-500">{errors.mobileNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("form.email")} *</Label>
              <EditableInput
                id="email"
                name="email"
                className={`h-10 ${errors.email ? "border-red-500" : ""}`}
                value={formData.email}
                onChange={handleChange}
                onNext={() => {
                  document.getElementById("password")?.focus();
                }}
                onCancel={() => {
                  setFormData({ ...formData, email: "" });
                }}
                placeholder={t("form.emailPlaceholder")}
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{t("form.status")}</Label>
              <Select
                value={formData.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder={t("form.selectStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {t("common.active")}
                    </span>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {t("common.inactive")}
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Second Row: Email and Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="password">{t("form.password")} *</Label>
              <div className="relative">
                <EditableInput
                  id="password"
                  name="password"
                  className={`h-10 pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                  onNext={() => {
                    document.getElementById("confirmPassword")?.focus();
                  }}
                  onCancel={() => {
                    setFormData({ ...formData, password: "" });
                  }}
                  placeholder={t("form.passwordPlaceholder")}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("form.confirmPassword")} *
              </Label>
              <div className="relative">
                <EditableInput
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`h-10 pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onNext={() => {
                    document.getElementById("otp")?.focus();
                  }}
                  onCancel={() => {
                    setFormData({ ...formData, confirmPassword: "" });
                  }}
                  placeholder={t("form.confirmPasswordPlaceholder")}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">{t("form.otp")}</Label>
              <EditableInput
                id="otp"
                name="otp"
                className="h-10"
                value={formData.otp}
                onChange={handleChange}
                onNext={() => {
                  document.getElementById("facebook")?.focus();
                }}
                onCancel={() => {
                  setFormData({ ...formData, otp: "" });
                }}
                placeholder={t("form.otpPlaceholder")}
              />
            </div>
          </div>

          {/* Third Row: Password and Confirm Password */}
          {isEdit && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="facebook">{t("form.facebook")}</Label>
              <EditableInput
                id="facebook"
                name="facebook"
                className="h-10"
                value={formData.facebook}
                onChange={handleChange}
                onNext={() => {
                  document.getElementById("linkedin")?.focus();
                }}
                onCancel={() => {
                  setFormData({ ...formData, facebook: "" });
                }}
                placeholder={t("form.facebookPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">{t("form.linkedin")}</Label>
              <EditableInput
                id="linkedin"
                name="linkedin"
                className="h-10"
                value={formData.linkedin}
                onChange={handleChange}
                onNext={() => {
                  document.getElementById("instagram")?.focus();
                }}
                onCancel={() => {
                  setFormData({ ...formData, linkedin: "" });
                }}
                placeholder={t("form.linkedinPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">{t("form.instagram")}</Label>
              <EditableInput
                id="instagram"
                name="instagram"
                className="h-10"
                value={formData.instagram}
                onChange={handleChange}
                onNext={() => {
                  // Focus on submit button or first field
                  document.getElementById("name")?.focus();
                }}
                onCancel={() => {
                  setFormData({ ...formData, instagram: "" });
                }}
                placeholder={t("form.instagramPlaceholder")}
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
