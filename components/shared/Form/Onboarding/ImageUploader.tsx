import React from "react";
import Image from "next/image";
import { UploadButton } from "~/utils/uploadthing";

interface ImageUploaderProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, setImage }) => {
  return (
    <div className="flex items-center justify-start gap-2">
      {image === undefined || image === "" ? (
        <div className="flex size-20 items-center justify-center rounded-md bg-myBlack-700">
          <Image
            src="/icons/base-image.svg"
            alt="default image"
            width={16}
            height={16}
          ></Image>
        </div>
      ) : (
        <Image
          src={image}
          alt="profile image"
          width={50}
          height={50}
          className="size-20 rounded-md"
        ></Image>
      )}
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
                      ? "Upload Profile Picture"
                      : "Change Profile Picture"}
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
          console.log("Files: ", res);
          setImage(res[0].url);
          // alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default ImageUploader;
