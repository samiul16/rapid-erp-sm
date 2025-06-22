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
          category: "Category",
          product: "Product",
          order: "Order",
          report: "Report",
          user: "User",
          settings: "Settings",
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
          light: "light",
          dark: "dark",
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
        list: "List",
        keepCreating: "Keep Creating",
        keepEditing: "Keep Editing",
        keep: "Keep",
        submit: "Submit",
        reset: "Reset",
        pdf: "PDF",
        viewingCountry: "Viewing Country",
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
        creatingCountry: "Creating Country",
        editingCountry: "Editing Country",
        resetConfirm: "Are you sure you want to reset the form?",
        countryFlag: "Country Flag",
        dragDropImage: "Drag and Drop",
        orClickToSelect: "Or click to select",
        callingCode: "Calling",
      },
      common: {
        createdAt: "Created At",
        updatedAt: "Updated At",
        default: "Default",
        active: "Active",
        draft: "Draft",
        submit: "Submit",
        reset: "Reset",
        import: "Import",
        export: "Export",
        filters: "Filters",
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
          category: "التصنيفات",
          product: "المنتجات",
          order: "الطلبات",
          report: "التقارير",
          user: "المستخدمين",
          settings: "الإعدادات",
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
        list: "List",
        keepCreating: "Continue Creating",
        keepEditing: "Continue Editing",
        keep: "يحفظ",
        submit: "Submit",
        reset: "Reset",
        pdf: "PDF",
        viewingCountry: "Viewing Country",
      },
      form: {
        countryCode: "كود الدولة",
        countryName: "اسم الدولة",
        countryNamePlaceholder: "أدخل اسم الدولة",
        changeImage: "تغيير الصورة",
        uploadImage: "رفع الصورة",
        rating: "التقييم",
        creatingCountry: "إنشاء دولة",
        editingCountry: "تعديل دولة",
        resetConfirm: "هل أنت متأكد من إعادة تعيين البيانات؟",
        countryFlag: "علم الدولة",
        dragDropImage: "السحب والإسقاط",
        orClickToSelect: "أو اضغط للاختيار",
        callingCode: "كود الاتصال",
      },
      common: {
        createdAt: "تم الإنشاء",
        updatedAt: "تم التحديث",
        default: "افتراضي",
        active: "نشط",
        draft: "مسودة",
        submit: "إرسال",
        reset: "إعادة تعيين",
        import: "استيراد",
        export: "تصدير",
        filters: "فلاتر",
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
