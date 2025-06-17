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
          country: "Country",
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
        country: "Country",
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
      button: {
        back: "Back",
        edit: "Edit",
        create: "Create",
        keepChanges: "Keep Changes",
        exportPDF: "Export PDF",
        print: "Print",
        delete: "Delete",
      },
      form: {
        countryCode: "Country Code",
        countryName: "Country Name",
        countryNamePlaceholder: "Enter country name",
        changeImage: "Change Image",
        uploadImage: "Upload Image",
        rating: "Rating",
        submit: "Submit",
        reset: "Reset",
        createCountry: "Create Country",
        editCountry: "Edit Country",
        resetConfirm: "Are you sure you want to reset the form?",
        countryFlag: "Country Flag",
      },
      common: {
        createdAt: "Created At",
        updatedAt: "Updated At",
        default: "Default",
        active: "Active",
        draft: "Draft",
        submit: "Submit",
        reset: "Reset",
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
          country: "الدول",
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
        country: "الدول",
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

      button: {
        back: "عودة",
        edit: "تعديل",
        create: "إنشاء",
        keepChanges: "حفظ التغييرات",
        exportPDF: "تصدير PDF",
        print: "طباعة",
        delete: "حذف",
      },
      form: {
        countryCode: "كود الدولة",
        countryName: "اسم الدولة",
        countryNamePlaceholder: "أدخل اسم الدولة",
        changeImage: "تغيير الصورة",
        uploadImage: "رفع الصورة",
        rating: "التقييم",
        createCountry: "إنشاء دولة",
        editCountry: "تعديل دولة",
        resetConfirm: "هل أنت متأكد من إعادة تعيين البيانات؟",
        countryFlag: "علم الدولة",
      },
      common: {
        createdAt: "تم الإنشاء",
        updatedAt: "تم التحديث",
        default: "افتراضي",
        active: "نشط",
        draft: "مسودة",
        submit: "إرسال",
        reset: "إعادة تعيين",
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
