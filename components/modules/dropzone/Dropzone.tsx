import { useCallback } from "react";

import { FaImage } from "react-icons/fa";
import { useDropzone, FileWithPath } from "react-dropzone";

import { Loader } from "components/widgets";
import { upload } from "redux/_actions/uploadAction";
import { useAppDispatch, useAppSelector } from "hooks";

interface Props {
  types?: "product" | "avatar"
}

const Dropzone = () => {
  const dispatch = useAppDispatch();
  const { loading} = useAppSelector((state) => state.upload);

  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      acceptedFiles.forEach((file: Blob) => {
        dispatch(upload(file));
      });
    },
    [dispatch]
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
  );
};

export default Dropzone;
