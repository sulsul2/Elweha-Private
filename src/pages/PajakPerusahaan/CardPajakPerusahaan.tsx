import { FormatRupiah } from "@arismun/format-rupiah";
import Checkbox from "../../components/Checkbox";

function CardPajakPerusahaan({
  label,
  value,
  isChecked,
  onClick,
}: {
  label: string;
  value: number;
  isChecked: boolean;
  onClick : React.MouseEventHandler<HTMLDivElement> | undefined;
}) {

  return (
    <>
      <div onClick={onClick} className="mt-4 flex w-full flex-col items-start justify-between md:flex-row">
        <div className=" shrink-0">
          {" "}
          <Checkbox onChange={()=>null} type="check" id="" label={label} checked = {value == 0 ? false : isChecked} />
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
