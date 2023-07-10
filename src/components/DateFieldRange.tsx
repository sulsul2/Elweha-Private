import { LegacyRef, MouseEventHandler, forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function DateFieldRange({ text }: { text: string }) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const CustomInput = forwardRef(
    (
      { value, onClick }: { value: string | number | readonly string[] | undefined; onClick: MouseEventHandler<HTMLInputElement> | undefined;},
      ref: LegacyRef<HTMLInputElement> | undefined
    ) => (
      <input
        value={value}
        className="w-full rounded border-2 border-kGrey-200 bg-[url(./assets/calendar_icon.svg)] bg-right bg-no-repeat bg-origin-content px-3 py-2 outline-kBlue"
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
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          customInput={<CustomInput value={undefined} onClick={undefined} />}
          placeholderText={text}
        />
    </>
  );
}

export default DateFieldRange;
