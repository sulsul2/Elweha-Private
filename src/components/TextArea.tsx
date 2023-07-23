import { useState } from "react";

function TextArea({
  style,
  label,
  placeholder,
  helpertext,
  value,
}: {
  style: string;
  label: string;
  placeholder: string;
  helpertext: string;
  value?: string | number | readonly string[] | undefined;
}) {
  const [description, setDescription] = useState("");

  return (
    <>
      <div className={style +" w-full"}>
        <label htmlFor={label} className="text-[#161616] text-[18px] font-semibold">
          {label}
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name="desc"
          id="desc"
          value={value}
          placeholder={placeholder}
          className="disabled:opacity-30 disabled:border-[#6B6B6B] p-3 text-primaryBlue placeholder:text-seccondaryBlue min-h-[100px] w-full rounded-lg border-2 border-[#A8A8A8] hover:border-kOrange-200 focus:outline-kOrange-400 caret-kOrange-400 bg-white text-small lg:h-[200px]"
        ></textarea>
        <div className="flex justify-between">
          <span className="text-[#6B6B6B] text-14 font-normal">{helpertext}</span>
          <p className="text-seccondaryBlue text-right text-xs font-medium">
            {description.length}/150
          </p>
        </div>
      </div>
    </>
  );
}

export default TextArea;
