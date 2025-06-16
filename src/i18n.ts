import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      login: "Login",
      welcome: "Welcome",
      sidebar: {
        menu: {
          search: "Search",
          dashboard: "Dashboard",
          pos: "POS",
          table: "Table",
          waiters: "Waiters",
        },
        search: {
          placeholder: "Search...",
          results: "Search results for: {{query}}",
          tabs: {
            general: "General",
            favourite: "Favourite",
            recent: "Recent",
          },
        },
        dashboard: {
          title: "Dashboard",
          content: "Dashboard content goes here...",
        },
        close: "Close",
      },

      navbar: {
        search: {
          placeholder: "Search...",
          open: "Open search",
          close: "Close search",
        },
        theme: {
          light: "Switch to light mode",
          dark: "Switch to dark mode",
        },
        user: "User profile",
      },
    },
  },
  ar: {
    translation: {
      login: "تسجيل الدخول",
      welcome: "أهلا بك",
      sidebar: {
        menu: {
          search: "بحث",
          dashboard: "لوحة التحكم",
          pos: "نقاط البيع",
          table: "طاولة",
          waiters: "النوادل",
        },
        search: {
          placeholder: "ابحث...",
          results: "نتائج البحث عن: {{query}}",
          tabs: {
            general: "عام",
            favourite: "المفضلة",
            recent: "حديث",
          },
        },
        dashboard: {
          title: "لوحة التحكم",
          content: "محتوى لوحة التحكم هنا...",
        },
        close: "إغلاق",
      },

      navbar: {
        search: {
          placeholder: "ابحث...",
          open: "فتح البحث",
          close: "إغلاق البحث",
        },
        theme: {
          light: "التبديل إلى الوضع الفاتح",
          dark: "التبديل إلى الوضع الداكن",
        },
        user: "ملف المستخدم",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
