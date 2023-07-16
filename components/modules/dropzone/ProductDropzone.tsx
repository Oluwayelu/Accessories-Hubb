import Image from "next/image";
import { useCallback } from "react";

import { toast } from "react-toastify";
import { FaImage } from "react-icons/fa";
import { useDropzone, FileWithPath } from "react-dropzone";

import { Loader } from "components/widgets";
import { upload, remove } from "_redux/_actions/uploadAction";
import { useAppDispatch, useAppSelector } from "hooks";

interface Props {
  images: string[];
}

const ProductDropzone = ({ images }: Props) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.upload);

  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      if(images.length + 1 <= 9) {
        acceptedFiles.forEach((file: Blob) => {
          dispatch(upload(file));
        });
      } else {
        toast.error("You can only have a maximum of 9 product images", {
          position: "bottom-left",
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
        });
      }
    },
    [dispatch, images]
  );

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg", ".jpg"],
      },
    });

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path} className="w-full flex items-center justify-between">
      <span>{file.path}</span>
      <button type="reset">{/* <ZuTrash className="text-red" /> */}x</button>
    </li>
  ));

  return (
    <div className="w-full h-fit md:h-60 p-5 bg-white shadow rounded-xl flex flex-col md:flex-row justify-start items-center gap-3">
      <div
        {...getRootProps()}
        className="w-full md:w-1/4 h-60 md:h-full p-5 flex items-center justify-center border border-dashed border-separate border-gray-200 bg-primary-100/50 rounded-lg space-y-3 cursor-pointer"
      >
        {loading ? (
          <div className="w-full flex flex-col items-center justify-center">
            <Loader color="#F5BD10" />
            <p>Uploading...</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <input {...getInputProps()} />
            <FaImage className="w-6 h-6 text-primary" />
            <p className="text-xs text-center font-medium">
              Upload product image
            </p>
          </div>
        )}
      </div>

      {images && (
        <div
          className={`${
            images.length <= 4 && "grid-cols-2 grid-rows-2"
          } ${
            images.length > 4 &&
            images.length <= 9 &&
            "grid-cols-3 grid-rows-3"
          } w-full md:w-3/4 h-60 md:h-full grid grid-flow-row gap-2`}
        >
          {images &&
            images.map((image, key) => (
              <div
                key={key}
                className={`${
                  images.length <= 3 && key === 0 && "row-span-2"
                } ${
                  images.length > 4 &&
                  images.length <= 7 &&
                  key === 0 &&
                  "row-span-3"
                } ${
                  images.length > 7 &&
                  images.length <= 8 &&
                  key === 0 &&
                  "row-span-2"
                } relative w-full h-full flex items-center justify-center rounded-xl border-2 group overflow-hidden`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt="image"
                    layout="fill"
                    className="filter object-contain object-center"
                  />
                </div>

                <div className="hidden group-hover:block group-hover:absolute inset-0 bg-dark/30 z-20">
                  <div className="relative w-full h-full flex flex-col items-center justify-center gap-2">                           
                    <button type="button" onClick={() => dispatch(remove(image))} className="text-xs font-medium px-2 py-1 rounded bg-white shadow">
                      remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductDropzone;
