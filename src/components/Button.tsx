import { FormEventHandler, MouseEventHandler } from "react";

function Button({
  text,
  type,
  style,
  onClick,
  onSubmit,
  isLoading,
}: {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  style: "primary" | "seccondary" | "third" | "delete" | "text";
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  onSubmit?: FormEventHandler<HTMLButtonElement> | undefined;
  isLoading?: boolean;
}) {
  return (
    <>
      <button
        disabled={isLoading}
        type={type}
        onClick={onClick}
        onSubmit={onSubmit}
        className={`h-[36px] w-[160px] rounded-[10px] text-12 font-bold md:h-[40px] md:w-[200px] md:text-16 ${
          style == "primary"
            ? "bg-kOrange-400 text-white hover:bg-kOrange-300 active:bg-kOrange-500"
            : style == "seccondary"
            ? "w-auto bg-kOrange-200 px-5  text-kOrange-500 hover:bg-kOrange-300 active:bg-kOrange-400 md:w-auto"
            : style == "third"
            ? "border border-kOrange-400 bg-white text-kOrange-400 hover:bg-kOrange-300 hover:text-white active:bg-kOrange-500 active:text-white"
            : style == "text"
            ? "text-16 font-light text-kOrange-400 hover:text-kOrange-300 active:text-kOrange-500"
            : "w-auto bg-[#FC4C4C] px-5 text-white hover:bg-[#FF7C7C] active:bg-kRed md:w-auto"
        }`}
      >
        {isLoading ? (
          <div
            className={`${
              style == "third" ? "text-kOrange-400" : "text-white"
            } flex items-center justify-center`}
          >
            <svg
              className="mr-3 h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </div>
        ) : (
          text
        )}
      </button>
    </>
  );
}

export default Button;
