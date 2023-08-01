// import as from 'Union.svg'
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function TextField({
  style,
  type,
  label,
  placeholder,
  helpertext = "",
  onChange,
  value,
  required,
}: {
  style?: string;
  type: "standart" | "action right" | "icon left" | "icon + action" | "search";
  label?: string;
  placeholder: string;
  helpertext?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | number | readonly string[] | undefined;
  required?: boolean;
}) {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const [currType, setCurrType] = useState("password");
  const [icon, setIcon] = useState(<AiFillEyeInvisible></AiFillEyeInvisible>);
  const handleToggle = () => {
    if (currType === "password") {
      setIcon(<AiFillEye></AiFillEye>);
      setCurrType("text");
    } else {
      setIcon(<AiFillEyeInvisible></AiFillEyeInvisible>);
      setCurrType("password");
    }
  };
  const handleClear = () => {
    setInputValue("");
  };

  return (
    <>
      {type == "standart" && (
        <div className={style + " w-full"}>
          <label
            htmlFor={label}
            className="text-[18px] font-semibold text-black disabled:opacity-30"
          >
            {label}
          </label>
          <div className="relative">
            <input
              required={required}
              type="text"
              placeholder={placeholder}
              className={`w-full rounded-lg border-2  ${
                helpertext != "" ? "border-kRed" : "border-[#A8A8A8]"
              } px-3 py-2 pr-7 caret-kOrange-400 placeholder:text-[#6B6B6B] hover:border-kOrange-200 focus:outline-kOrange-400 disabled:border-[#6B6B6B] disabled:opacity-30 lg:pr-12`}
              value={inputValue}
              onChange={handleChange}
            />
          </div>
          {helpertext != "" && (
            <span className="text-14 text-kRed">{helpertext}</span>
          )}
        </div>
      )}

      {type == "action right" && (
        <div className={style + " w-full"}>
          <label
            htmlFor={label}
            className="text-[18px] font-semibold text-black"
          >
            {label}
          </label>
          <div className="relative flex items-center">
            <input
              required={required}
              type={currType}
              placeholder={placeholder}
              className={`w-full rounded-lg border-2  ${
                helpertext != "" ? "border-kRed" : "border-[#A8A8A8]"
              } px-3 py-2  pr-7 caret-kOrange-400 placeholder:text-[#6B6B6B] hover:border-kOrange-200 focus:outline-kOrange-400 disabled:border-[#6B6B6B] disabled:opacity-30 sm:pr-10 md:pr-10 lg:pr-14`}
              value={inputValue}
              onChange={handleChange}
            />
            <span
              className="absolute right-[3%] flex cursor-pointer items-center justify-around text-lg lg:text-2xl xl:right-[2%]"
              onClick={handleToggle}
            >
              {icon}
            </span>
          </div>
          {helpertext != "" && (
            <span className="text-14 text-kRed">{helpertext}</span>
          )}
        </div>
      )}

      {type == "icon left" && (
        <div className={style + " w-full"}>
          <label
            htmlFor={label}
            className="text-[18px] font-semibold text-black"
          >
            {label}
          </label>
          <div className="relative">
            <img
              src="assets/Union.svg"
              alt=""
              className="absolute left-[3%] top-[30%] md:left-[2%] lg:left-[1%]"
            />
            <input
              required={required}
              type="text"
              placeholder={placeholder}
              className={`w-full rounded-lg border-2 ${
                helpertext != "" ? "border-kRed" : "border-[#A8A8A8]"
              } p-3 px-10 caret-[#186ADE] placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE] disabled:border-[#6B6B6B] disabled:opacity-30`}
              value={inputValue}
              onChange={handleChange}
            />
            {inputValue && (
              <button
                className="absolute right-[5%] top-[27%] font-semibold focus:text-[#186ADE] md:right-[3%] lg:right-[2%]"
                onClick={handleClear}
              >
                ✖
              </button>
            )}
          </div>
          {helpertext != "" && (
            <span className="text-14 text-kRed">{helpertext}</span>
          )}
        </div>
      )}

      {type == "icon + action" && (
        <div className={style + " w-full"}>
          <label
            htmlFor={label}
            className="text-[18px] font-semibold text-black"
          >
            {label}
          </label>
          <div className="relative">
            <img
              src="assets/lock.svg"
              alt=""
              className="absolute left-[5%] top-[30%] md:left-[2%] lg:left-[1%]"
            />
            <input
              required={required}
              type={currType}
              placeholder={placeholder}
              className={`w-full rounded-lg border-2 ${
                helpertext != "" ? "text-kRed" : "border-[#A8A8A8]"
              } p-3 px-7 caret-[#186ADE] placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE] disabled:border-[#6B6B6B] disabled:opacity-30 lg:px-12`}
              value={inputValue}
              onChange={handleChange}
            />
            <span
              className="absolute right-[2%] top-[30%] cursor-pointer text-lg lg:top-[27%] lg:text-2xl"
              onClick={handleToggle}
            >
              {icon}
            </span>
          </div>
          {helpertext != "" && (
            <span className="text-14 text-kRed">{helpertext}</span>
          )}
        </div>
      )}

      {type == "search" && (
        <div className={style + " w-full"}>
          <div className="pointer-events-none flex w-full justify-between rounded-lg border-2 border-[#A8A8A8] px-2 focus-within:border-kOrange-400 hover:border-kOrange-200 hover:focus-within:border-kOrange-400 disabled:border-[#6B6B6B]">
            <input
              required={required}
              tabIndex={0}
              type="text"
              placeholder={placeholder}
              className="pointer-events-auto w-full border-none px-3 py-2 caret-kOrange-400 outline-none placeholder:text-[#6B6B6B] disabled:opacity-30"
              value={inputValue}
              onChange={handleChange}
            />
            <img src="assets/search.svg" alt="" />
          </div>
        </div>
      )}
    </>
  );
}

export default TextField;
