import { useEffect } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

interface DropzoneProps {
  childToParent: (x: File) => void | undefined;
}

const UploadFile = ({ childToParent }: DropzoneProps) => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    maxFiles: 1,
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  const files = acceptedFiles.map((file: FileWithPath) => {
    return (
      <li key={file.path}>
        <div className="flex">
          <div className=" ml-1">
            <p>
              {file.path} - {file.size} bytes
            </p>
            <p className=" text-success font-[8px] text-kGreen">
              Successfully uploaded!
            </p>
          </div>
        </div>
      </li>
    );
  });

  useEffect(() => {
    childToParent(acceptedFiles[0]);
  }, [acceptedFiles]);

  return (
    <div className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="wrapper flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-kOrange-400 bg-white py-[5.34%]">
          <p className={"text-center text-xs font-normal text-kOrange-300"}>
            Drag and Drop Your Files Here
          </p>
          <p className={"text-xs font-normal text-kOrange-300"}>or</p>
          <button
            type="button"
            onClick={open}
            className="flex w-auto cursor-pointer items-center justify-around rounded-lg bg-kOrange-400 px-[21px] py-[6px] text-white hover:bg-kOrange-300 active:bg-kOrange-500"
          >
            Browse File
          </button>
        </div>
      </div>
      <aside>
        <h4 className=" text-xs font-normal text-kOrange-300">
          Uploaded files:
        </h4>
        <ul className=" text-xs font-semibold text-kOrange-300">
          <div>{files}</div>
        </ul>
      </aside>
    </div>
  );
};

export default UploadFile;
