function Button({
  text,
  type,
  style,
}: {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  style: "primary" | "seccondary" | "third";
}) {
  return (
    <>
      <button
        type={type}
        className={`h-[41px] w-[173px] rounded-[10px] text-16 font-bold ${
          style == "primary"
            ? "bg-kOrange-400 text-white hover:bg-kOrange-300 active:bg-kOrange-500"
            : style == "seccondary"
            ? "bg-kOrange-200 text-kOrange-500 hover:bg-kOrange-300 active:bg-kOrange-400"
            : "border border-kOrange-400 bg-white text-kOrange-400 hover:bg-kOrange-300 hover:text-white active:bg-kOrange-500 active:text-white"
        }`}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
