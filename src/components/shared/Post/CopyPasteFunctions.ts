import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message: string) => {
  toast.info(message, {
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

export const handleCopyClick = async (
  event: React.MouseEvent<HTMLImageElement>
) => {
  const codeBlock = (event.target as HTMLElement)
    .closest("pre")
    ?.querySelector("code");
  if (codeBlock) {
    try {
      await navigator.clipboard.writeText(codeBlock.textContent || "");
      showToast("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
};
