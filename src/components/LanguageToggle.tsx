import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    document.documentElement.setAttribute(
      "dir",
      newLang === "ar" ? "rtl" : "ltr"
    );
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLang}
      className="ml-4 px-2 py-1 rounded bg-gray-100 dark:bg-gray-700"
    >
      {i18n.language === "ar" ? "EN" : "عربى"}
    </button>
  );
};

export default LanguageToggle;
