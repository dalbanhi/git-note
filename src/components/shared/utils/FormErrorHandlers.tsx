import { toast, Flip } from "react-toastify";

export const showError = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    progress: undefined,
    transition: Flip,
  });
};

export const handleSingleFieldError = (
  prependingString: string,
  error: any
) => {
  let errorMsg = "";
  if (error) {
    errorMsg = `${prependingString} Error: ${error.message}`;
    showError(errorMsg);
  }
};

export const handleFieldArrayError = (prependingString: string, error: any) => {
  let errorMsg = "";
  if (!error) return;
  if (Array.isArray(error)) {
    for (let err of error) {
      for (let key in err) {
        errorMsg += `${prependingString} Error: ${err[key].message} `;
        break;
      }
      if (errorMsg !== "") {
        break;
      }
    }
  } else {
    errorMsg = `${prependingString} Error: ${error.message}`;
  }
  showError(errorMsg);
};
