import React from "react";
import Image from "next/image";
import { UploadButton } from "~/utils/uploadthing";
import "@uploadthing/react/styles.css";

import { useEffect, useState } from "react";

interface ImagePreviewUploaderProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImagePreviewUploader: React.FC<ImagePreviewUploaderProps> = ({
  image,
  setImage,
  setSubmitButtonDisabled,
}) => {
  const [isFileSelected, setIsFileSelected] = useState(false);

  useEffect(() => {
    if (isFileSelected) {
      setSubmitButtonDisabled(true);
    }
  }, [isFileSelected, setSubmitButtonDisabled]);
  return (
    <div className="flex w-full flex-col items-center justify-start gap-1">
      <UploadButton
        endpoint="imageUploader"
        content={{
          button({ ready }) {
            if (ready)
              return (
                <div className="flex gap-1 p-2 ">
                  <Image
                    src="/icons/cloud-upload.svg"
                    alt="upload"
                    width={16}
                    height={16}
                  />
                  <span className="text-p3Med text-myWhite-300">
                    {image === undefined || image === ""
                      ? "Upload Picture"
                      : "Change Picture"}
                  </span>
                </div>
              );

            return "Loading...";
          },
          allowedContent({ ready, fileTypes, isUploading }) {
            if (!ready) return "Getting server info...";
            if (isUploading) return "Uploading...";
            return `Only upload ${fileTypes.join(", ")} files.`;
          },
        }}
        appearance={{
          button: "bg-myBlack-700 w-full",
          container: "w-7/12 h-1/2",
          allowedContent: "h-0",
        }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          setImage(res[0].url);
          setSubmitButtonDisabled(false);
          setIsFileSelected(true);
        }}
        onUploadBegin={() => {
          setSubmitButtonDisabled(true);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
          setSubmitButtonDisabled(false);
          setIsFileSelected(false); // Reset state on error
        }}
      />
      <div className=" relative h-96 w-full rounded-md">
        <Image
          src={image || "/images/placeholder-large.png"}
          alt={`user uploaded image`}
          width={400}
          height={400}
          className="absolute left-0 top-0 size-full rounded-md object-contain"
        />
      </div>
    </div>
  );
};

export default ImagePreviewUploader;
