// src/utils/toast.ts
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

withReactContent(Swal);

// Base Toast configuration
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: "rounded-lg shadow-md",
  },
});

export const showToast = (
  type: "success" | "error" | "info" | "warning",
  message: string
) => {
  Toast.fire({
    icon: type,
    title: message,
  });
};

// Optionally export pre-configured helpers
export const toastSuccess = (message: string) => showToast("success", message);
export const toastError = (message: string) => showToast("error", message);
export const toastInfo = (message: string) => showToast("info", message);
export const toastWarning = (message: string) => showToast("warning", message);
