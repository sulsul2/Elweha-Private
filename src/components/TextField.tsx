// import as from 'Union.svg'
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function TextField({
  style,
  type,
  label,
  placeholder,
  helpertext,
  onChange,
  value,
}: {
  style?: string;
  type: "standart" | "action right" | "icon left" | "icon + action" | "search";
  label: string;
  placeholder: string;
  helpertext: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | number | readonly string[] | undefined;
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
              type="text"
              placeholder={placeholder}
              className={`w-full rounded-lg border-2  ${
                helpertext != "" ? "border-kRed" : "border-[#A8A8A8]"
              } p-3 pr-7 caret-[#186ADE] placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE] disabled:border-[#6B6B6B] disabled:opacity-30 lg:pr-12`}
              value={inputValue}
              onChange={handleChange}
            />
            {inputValue && (
              <button
                className="absolute right-[10%] top-[27%] font-semibold focus:text-[#186ADE] sm:right-[6%] md:right-[5%] lg:right-[4%]"
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

      {type == "action right" && (
        <div className={style + " w-full"}>
          <label
            htmlFor={label}
            className="text-[18px] font-semibold text-black"
          >
            {label}
          </label>
          <div className="relative">
            <input
              type={currType}
              placeholder={placeholder}
              className={`w-full rounded-lg border-2  ${
                helpertext != "" ? "border-kRed" : "border-[#A8A8A8]"
              } p-3 pr-7 caret-[#186ADE] placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE] disabled:border-[#6B6B6B] disabled:opacity-30 lg:pr-12`}
              value={inputValue}
              onChange={handleChange}
            />
            <span
              className="absolute right-[3%] top-[30%] cursor-pointer text-lg lg:top-[27%] lg:text-2xl"
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

          <div className="relative ">
            {/* <img
              src="assets/search.svg"
              alt=""
              className="absolute left-[3%] top-[30%] sm:left-[3%] md:left-[2%] lg:left-[1%]"
            /> */}
            <input
              type="text"
              placeholder={placeholder}
              className="bg-[url(./assets/search.svg)] bg-no-repeat bg-origin-content bg-right w-full rounded-lg border-2 border-[#A8A8A8] p-3 caret-[#186ADE] placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE] disabled:border-[#6B6B6B] disabled:opacity-30"
              value={inputValue}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TextField;
