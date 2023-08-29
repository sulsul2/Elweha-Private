import { LegacyRef, MouseEventHandler, forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function DateFieldNormal({
  text,
  onChange,
  required,
  value,
}: {
  text: string;
  onChange: any;
  required?: boolean;
  value?: Date | null;
}) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const CustomInput = forwardRef(
    (
      {
        value,
        onClick,
      }: {
        value?: string | number | readonly string[] | undefined;
        onClick?: MouseEventHandler<HTMLInputElement> | undefined;
      },
      ref: LegacyRef<HTMLInputElement> | undefined
    ) => (
      <input
        required={required}
        value={value}
        placeholder={text}
        onChange={onChange}
        className="w-full rounded-lg border-2 border-kGrey-200 bg-[url(./assets/calendar_icon.svg)] bg-right bg-no-repeat bg-origin-content px-3 py-2 hover:border-kOrange-200 focus:outline-kOrange-400"
        onClick={onClick}
        ref={ref}
      ></input>
    )
  );
  return (
    <>
      <DatePicker
        wrapperClassName="w-full"
        dateFormat={"dd MMMM yyyy"}
        showMonthDropdown
        showYearDropdown
        scrollableYearDropdown
        popperPlacement="bottom"
        showPopperArrow={false}
        selected={startDate == null && value != null ? value : startDate}
        onChange={(date) => {
          setStartDate(date);
          onChange(date);
        }}
        customInput={<CustomInput />}
        placeholderText={text}
      />
    </>
  );
}

export default DateFieldNormal;
