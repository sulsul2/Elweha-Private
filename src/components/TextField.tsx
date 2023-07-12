// import as from '../../public/Union.svg'
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
  style: string;
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
            className="disabled:opacity-30 text-[18px] font-semibold text-black"
          >
            {label}
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={placeholder}
              className="disabled:opacity-30 disabled:border-[#6B6B6B] w-full  rounded-lg border-2 border-[#A8A8A8] p-3 caret-[#186ADE] placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE]"
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
          <span className="text-[#6B6B6B] text-14">{helpertext}</span>
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
              className="disabled:opacity-30 disabled:border-[#6B6B6B] w-full  rounded-lg border-2 border-[#A8A8A8] p-3 caret-[#186ADE] placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE]"
              value={inputValue}
              onChange={handleChange}
            />
            <span
              className="absolute right-[2%] top-[27%] cursor-pointer text-lg lg:text-2xl"
              onClick={handleToggle}
            >
              {icon}
            </span>
          </div>
          <span className="text-[#6B6B6B] text-14">{helpertext}</span>
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
              src="../../public/assets/Union.svg"
              alt=""
              className="absolute left-[3%] top-[30%] md:left-[2%] lg:left-[1%]"
            />
            <input
              type="text"
              placeholder={placeholder}
              className="disabled:opacity-30 disabled:border-[#6B6B6B] w-full rounded-lg border-2 border-[#A8A8A8] p-3 px-10 caret-[#186ADE] placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE]"
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
          <span className="text-[#6B6B6B] text-14">{helpertext}</span>
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
              src="../../public/assets/lock.svg"
              alt=""
              className="absolute left-[3%] top-[30%] md:left-[2%] lg:left-[1%]"
            />
            <input
              type={currType}
              placeholder={placeholder}
              className="disabled:opacity-30 disabled:border-[#6B6B6B] w-full rounded-lg border-2 border-[#A8A8A8] p-3 px-10 caret-[#186ADE] placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE]"
              value={inputValue}
              onChange={handleChange}
            />
            <span
              className="absolute right-[2%] top-[27%] cursor-pointer text-lg lg:text-2xl"
              onClick={handleToggle}
            >
              {icon}
            </span>
          </div>
          <span className="text-[#6B6B6B] text-14">{helpertext}</span>
        </div>
      )}

      {type == "search" && (
        <div className="relative">
          <img
            src="../../public/assets/search.svg"
            alt=""
            className="absolute left-[3%] top-[30%] md:left-[2%] lg:left-[1%]"
          />
          <input
            type="text"
            placeholder={placeholder}
            className="disabled:opacity-30 disabled:border-[#6B6B6B] w-full rounded-lg border-2 border-[#A8A8A8] p-3 px-10 caret-[#186ADE] placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE]"
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
          <span className="text-14 text-[#6B6B6B]">{helpertext}</span>
        </div>
      )}
    </>
  );
}

export default TextField;
