import React, { useState, useEffect } from "react";

function useUploadImage() {
  const [imageError, setImageError] = useState({
    status: false,
    errorText: undefined,
  });
  const [imageFilename, setImageFilename] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const imageChangeHandler = (event) => {
    const file = event.target.files[0];

    if (file !== undefined) {
      const reader = new FileReader(file);

      reader.addEventListener("load", () => {
        const allowedFileTypes = ["image/png", "image/jpeg"];
        if (!allowedFileTypes.includes(file.type)) {
          setImageError({
            status: true,
            errorText: "Only images should be uploaded",
          });
          return;
        }

        if (file.size > 4000000) {
          setImageError({
            status: true,
            errorText: "Image size should not be more than 4mb",
          });
          return;
        }

        setImageError({ status: false, errorText: undefined });
        setImageSrc(reader.result);
        setImageFilename(file.name);
      });

      reader.readAsDataURL(file);
    } else {
      setImageSrc("");
      setImageFilename("");
    }
  };

  useEffect(() => {
    if (imageError.status === true) {
      setTimeout(() => {
        setImageError({ status: false, errorText: undefined });
      }, 1500);
    }
  }, [imageError.status]);

  return {
    imageError,
    setImageFilename,
    setImageError,
    imageChangeHandler,
    imageSrc,
    setImageSrc,
  };
}

export default useUploadImage;
