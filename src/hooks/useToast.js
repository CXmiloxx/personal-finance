import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const useToast = () => {
  const showToast = (icon, title) => {
    Swal.fire({
      icon,
      title,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: "#333",
      color: "#fff",
      customClass: {
        popup: "rounded-lg shadow-lg",
      },
    });
  };

  return { showToast };
};
