import { useState } from "react";

function TextArea({
  style,
  label,
  placeholder,
  helpertext = "",
  value,
  required,
  onChange,
}: {
  style?: string;
  label?: string;
  placeholder: string;
  helpertext?: string;
  value?: string | number | readonly string[] | undefined;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
}) {
  const [description, setDescription] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <>
      <div className={style + " w-full"}>
        <label
          htmlFor={label}
          className="text-[18px] font-semibold text-[#161616]"
        >
          {label}
        </label>
        <textarea
          required={required}
          onChange={handleChange}
          name="desc"
          id="desc"
          value={value}
          placeholder={placeholder}
          className="text-primaryBlue placeholder:text-seccondaryBlue text-small min-h-[100px] w-full rounded-lg border-2 border-[#A8A8A8] bg-white p-3 caret-kOrange-400 hover:border-kOrange-200 focus:outline-kOrange-400 disabled:border-[#6B6B6B] disabled:opacity-30 lg:h-[200px]"
        ></textarea>
        <div className="flex justify-between">
          <span className="text-14 font-normal text-[#6B6B6B]">
            {helpertext}
          </span>
          <p className="text-seccondaryBlue text-right text-xs font-medium">
            {description.length}/150
          </p>
        </div>
      </div>
    </>
  );
}

export default TextArea;
