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
      <div className="mt-4 flex w-full justify-between gap-1">
        <Checkbox type="check" id="" label={label} />
        <span>
          <FormatRupiah value={value} />
          ,-
        </span>
      </div>
    </>
  );
}

export default CardPajakPerusahaan;
