import { FormatRupiah } from "@arismun/format-rupiah";
import Checkbox from "../../components/Checkbox";

function CardPajakPerusahaan({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <>
      <div className="mt-4 flex w-full flex-col items-start justify-between md:flex-row">
        <div className=" shrink-0">
          {" "}
          <Checkbox type="check" id="" label={label} checked = {value == 0 ? false : true} />
        </div>
        <span className=" break-words text-end lg:w-full xl:w-full">
          <FormatRupiah value={value} />
          ,-
        </span>
      </div>
    </>
  );
}

export default CardPajakPerusahaan;
