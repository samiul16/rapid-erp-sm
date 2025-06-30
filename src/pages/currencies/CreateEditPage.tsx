import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import YoutubeButton from "@/components/common/YoutubeButton";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CurrencyData = {
  id?: string;
  code: string;
  currency: string;
  exchangeRate: number;
  rating: number;
  symbol?: string;
  countryCode?: string;
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
  currencyCode: string;
};

const MOCK_COUNTRIES: CountryOption[] = [
  { code: "US", name: "United States", flag: "🇺🇸", currencyCode: "USD" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currencyCode: "GBP" },
  { code: "EU", name: "European Union", flag: "🇪🇺", currencyCode: "EUR" },
  { code: "JP", name: "Japan", flag: "🇯🇵", currencyCode: "JPY" },
  { code: "CN", name: "China", flag: "🇨🇳", currencyCode: "CNY" },
  { code: "IN", name: "India", flag: "🇮🇳", currencyCode: "INR" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", currencyCode: "AED" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", currencyCode: "SAR" },
];

const MOCK_CURRENCIES = [
  { code: "USD", currency: "US Dollar", exchangeRate: 1.0, rating: 5 },
  { code: "EUR", currency: "Euro", exchangeRate: 0.93, rating: 4 },
  { code: "GBP", currency: "British Pound", exchangeRate: 0.79, rating: 4 },
  { code: "JPY", currency: "Japanese Yen", exchangeRate: 151.36, rating: 3 },
  { code: "AUD", currency: "Australian Dollar", exchangeRate: 1.52, rating: 3 },
  { code: "CAD", currency: "Canadian Dollar", exchangeRate: 1.36, rating: 3 },
  { code: "CNY", currency: "Chinese Yuan", exchangeRate: 7.23, rating: 4 },
  { code: "INR", currency: "Indian Rupee", exchangeRate: 83.3, rating: 3 },
  { code: "AED", currency: "UAE Dirham", exchangeRate: 3.67, rating: 3 },
  { code: "SAR", currency: "Saudi Riyal", exchangeRate: 3.75, rating: 3 },
];

const defaultCurrencyData: CurrencyData = {
  code: "",
  currency: "",
  exchangeRate: 0,
  rating: 0,
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
};

type Props = {
  isEdit?: boolean;
  initialData?: CurrencyData;
};

export default function CurrencyCreateEdit({
  isEdit = false,
  initialData,
}: Props) {
  const { t, i18n } = useTranslation();
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currencyInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<CurrencyData>(
    initialData || defaultCurrencyData
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

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? "" : Number(value),
    });
  };

  const handleCountryChange = (value: string) => {
    const country = MOCK_COUNTRIES.find((c) => c.code === value);
    if (country) {
      const currency = MOCK_CURRENCIES.find(
        (c) => c.code === country.currencyCode
      );
      if (currency) {
        setFormData({
          ...formData,
          countryCode: country.code,
          code: currency.code,
          currency: currency.currency,
          exchangeRate: currency.exchangeRate,
          rating: currency.rating,
        });
      } else {
        setFormData({
          ...formData,
          countryCode: country.code,
          code: country.currencyCode,
        });
      }
    }
  };

  const handleCurrencySelect = (currency: (typeof MOCK_CURRENCIES)[0]) => {
    setFormData({
      ...formData,
      code: currency.code,
      currency: currency.currency,
      exchangeRate: currency.exchangeRate,
      rating: currency.rating,
    });
    setShowCurrencyDropdown(false);
    setSearchTerm("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          symbol: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSymbol = () => {
    setFormData({
      ...formData,
      symbol: undefined,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const setRating = (rating: number) => {
    setFormData({
      ...formData,
      rating,
    });
  };

  const getSelectedCountry = () => {
    return MOCK_COUNTRIES.find((c) => c.code === formData.countryCode);
  };

  const filteredCurrencies = MOCK_CURRENCIES.filter((currency) =>
    `${currency.code} ${currency.currency}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Currency form submitted:", formData);
    // Add your submission logic here
  };

  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData(defaultCurrencyData);
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
              {isEdit ? t("form.editingCurrency") : t("form.creatingCurrency")}
            </h1>
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 p-5 bg-blue-400 hover:bg-blue-600 text-white hover:text-white cursor-pointer rounded-full"
              onClick={() => navigate("/currencies")}
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
          {/* First Row: Code, Currency, Exchange Rate */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            {/* Currency Code - 4 columns */}
            <div className="md:col-span-4 space-y-1 relative">
              <Label htmlFor="code">{t("form.code")}</Label>
              <div className="relative">
                <Input
                  id="code"
                  name="code"
                  ref={currencyInputRef}
                  className="h-10 pr-8"
                  value={formData.code}
                  onChange={(e) => {
                    setFormData({ ...formData, code: e.target.value });
                    setSearchTerm(e.target.value);
                  }}
                  onFocus={() => setShowCurrencyDropdown(true)}
                  placeholder={t("form.currencyCodePlaceholder")}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2.5"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
              </div>
              {showCurrencyDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredCurrencies.length > 0 ? (
                    filteredCurrencies.map((currency) => (
                      <div
                        key={currency.code}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCurrencySelect(currency)}
                      >
                        <div className="font-medium">{currency.code}</div>
                        <div className="text-sm text-gray-500">
                          {currency.currency}
                        </div>
                        <div className="text-sm">
                          Exchange: {currency.exchangeRate}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">
                      No currencies found. Add a new one.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Currency Name - 4 columns */}
            <div className="md:col-span-4 space-y-1">
              <Label htmlFor="currency">{t("form.currency")}</Label>
              <Input
                id="currency"
                name="currency"
                className="h-10"
                value={formData.currency}
                onChange={handleChange}
                placeholder={t("form.currencyNamePlaceholder")}
                required
              />
            </div>

            {/* Exchange Rate - 4 columns */}
            <div className="md:col-span-4 space-y-1">
              <Label htmlFor="exchangeRate">{t("form.exchangeRate")}</Label>
              <Input
                id="exchangeRate"
                name="exchangeRate"
                type="number"
                step="0.01"
                className="h-10"
                value={formData.exchangeRate}
                onChange={handleNumberChange}
                placeholder={t("form.exchangeRatePlaceholder")}
                required
              />
            </div>
          </div>

          {/* Second Row: Rating, Symbol, Country */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            {/* Rating - 4 columns */}
            <div className="md:col-span-4 space-y-1">
              <Label>{t("form.rating")}</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 cursor-pointer ${
                      star <= formData.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {formData.rating}/5
                </span>
              </div>
            </div>

            {/* Symbol - 4 columns */}
            <div className="md:col-span-4 space-y-1">
              <Label>{t("form.symbol")}</Label>
              <div
                className={`flex items-center justify-center w-full ${
                  !formData.symbol ? "min-h-[100px]" : ""
                }`}
              >
                {formData.symbol ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={formData.symbol}
                      alt="Currency symbol"
                      className="h-10 w-10 object-contain border rounded"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={removeSymbol}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="relative w-full"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith("image/")) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setFormData({
                            ...formData,
                            symbol: event.target?.result as string,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  >
                    <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-1">
                        {t("form.dragDropImage")}
                      </p>
                      <p className="text-xs text-gray-400">{t("form.or")}</p>
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2 mt-2"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4" />
                        {t("button.selectFile")}
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Country Dropdown - 4 columns */}
            <div className="md:col-span-4 space-y-1">
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
                          {country.currencyCode}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
