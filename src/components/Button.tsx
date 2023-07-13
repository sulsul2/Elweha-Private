import { FormEventHandler, MouseEventHandler } from "react";

function Button({
  text,
  type,
  style,
  onClick,
  onSubmit,
}: {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  style: "primary" | "seccondary" | "third" | "delete";
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  onSubmit?: FormEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        onSubmit={onSubmit}
        className={`h-[36px] w-[160px] rounded-[10px] text-12 font-bold md:h-[40px] md:w-[200px] md:text-16 ${
          style == "primary"
            ? "bg-kOrange-400 text-white hover:bg-kOrange-300 active:bg-kOrange-500"
            : style == "seccondary"
            ? "w-auto bg-kOrange-200  px-5 text-kOrange-500 hover:bg-kOrange-300 active:bg-kOrange-400"
            : style == "third"
            ? "border border-kOrange-400 bg-white text-kOrange-400 hover:bg-kOrange-300 hover:text-white active:bg-kOrange-500 active:text-white"
            : " w-auto bg-[#FC4C4C] px-5 text-white hover:bg-[#FF7C7C] active:bg-kRed"
        }`}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
