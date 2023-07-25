import { LegacyRef, MouseEventHandler, forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function DateFieldNormal({ text }: { text: string }) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const CustomInput = forwardRef(
    (
      { value, onClick }: { value: string | number | readonly string[] | undefined; onClick: MouseEventHandler<HTMLInputElement> | undefined;},
      ref: LegacyRef<HTMLInputElement> | undefined
    ) => (
      <input
        value={value}
        placeholder={text}
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
          dateFormat={"dd.MM.yyyy"}
          showMonthDropdown
          showYearDropdown
          scrollableYearDropdown
          popperPlacement="bottom"
          showPopperArrow={false}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={<CustomInput value={undefined} onClick={undefined} />}
          placeholderText={text}
        />
    </>
  );
}

export default DateFieldNormal;
