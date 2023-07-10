// import as from '../../public/Union.svg'
import { useState } from 'react';
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
  const [inputValue, setInputValue] = useState(value || '');

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
    setInputValue('');
  };

  return (
    <>

          
        {type == "standart" && (
        <div className={style + " w-full"}>
          <label htmlFor={label} className="text-[#161616]">
            {label}
          </label>    
          <div className="relative">
            <input
              type="text"
              placeholder={placeholder}
              className="w-full  p-3 border-2 border-[#A8A8A8] rounded-lg placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE] caret-[#186ADE]"
              value={inputValue}
              onChange={handleChange}
            />
            {inputValue && (
              <button
                className="font-semibold absolute top-[27%] right-[5%] md:right-[3%] lg:right-[2%] focus:text-[#186ADE]"
                onClick={handleClear}
              >
                ✖
              </button>
            )}
          </div>
        </div>)}

        {type == 'action right' && (
        <div className={style + " w-full"}>
          <label htmlFor={label} className="text-[#161616]">
            {label}
          </label>
          <div className="relative">
            <input
              type={currType}
              placeholder={placeholder}
              className="w-full  p-3 border-2 border-[#A8A8A8] rounded-lg placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE] caret-[#186ADE]"
              value={inputValue}
              onChange={handleChange}
            />
            <span
            className="absolute top-[27%] right-[2%] text-lg lg:text-2xl cursor-pointer"
            onClick={handleToggle}>
            {icon}
            </span>
          </div>
        </div>)}
          
        {type == 'icon left' && (
        <div className={style + " w-full"}>
          <label htmlFor={label} className="text-[#161616]">
            {label}
          </label>
          <div className="relative">
            <img src="../../public/assets/Union.svg" alt="" className='absolute top-[30%] left-[3%] md:left-[2%] lg:left-[1%]' />
            <input
              type="text"
              placeholder={placeholder}
              className="w-full px-10 p-3 border-2 border-[#A8A8A8] rounded-lg placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE] caret-[#186ADE]"
              value={inputValue}
              onChange={handleChange}
            />
            {inputValue && (
              <button
                className="font-semibold absolute top-[27%] right-[5%] md:right-[3%] lg:right-[2%] focus:text-[#186ADE]"
                onClick={handleClear}
              >
                ✖
              </button>
            )}
          </div>
        </div>)}

        {type == 'icon + action' && (
        <div className={style + " w-full"}>
          <label htmlFor={label} className="text-[#161616]">
            {label}
          </label>
            <div className="relative">
            <img src="../../public/assets/lock.svg" alt="" className='absolute top-[30%] left-[3%] md:left-[2%] lg:left-[1%]' />
            <input
              type={currType}
              placeholder={placeholder}
              className="w-full px-10 p-3 border-2 border-[#A8A8A8] rounded-lg placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE] caret-[#186ADE]"
              value={inputValue}
              onChange={handleChange}
            />
            <span
            className="absolute top-[27%] right-[2%] text-lg lg:text-2xl cursor-pointer"
            onClick={handleToggle}>
            {icon}
            </span>
          </div>
        </div>)}

          {type == 'search' && (
          <div className="relative">
            <img src="../../public/assets/search.svg" alt="" className='absolute top-[30%] left-[3%] md:left-[2%] lg:left-[1%]' />
            <input
              type='text'
              placeholder={placeholder}
              className="w-full px-10 p-3 border-2 border-[#A8A8A8] rounded-lg placeholder:text-[#6B6B6B] hover:border-[#6B6B6B] focus:outline-[#186ADE] caret-[#186ADE]"
              value={inputValue}
              onChange={handleChange}
            />
            {inputValue && (
              <button
                className="font-semibold absolute top-[27%] right-[5%] md:right-[3%] lg:right-[2%] focus:text-[#186ADE]"
                onClick={handleClear}
              >
                ✖
              </button>
            )}
          </div>)}

          <span className="text-[#6B6B6B]">{helpertext}</span>
    </>
  );
}

export default TextField;
