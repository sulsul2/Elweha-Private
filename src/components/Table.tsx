import { Link } from "react-router-dom";
import Checkbox from "./Checkbox";
import { BiSolidPencil } from "react-icons/bi";

function Table({
  data,
  column,
  isLoading,
  page,
  dataLimit,
  onEdit,
  onSelected,
  selected,
  isCheck = true,
  isNum = true,
  isEdit = true,
  isWithSum = false,
  detailUrl,
}: {
  data: any;
  column: any;
  isLoading: boolean;
  page: number;
  dataLimit: number;
  onEdit?: (x: number) => void | undefined;
  onSelected?: (x: Array<number>) => void | undefined;
  selected?: Array<number>;
  isCheck?: boolean;
  isNum?: boolean;
  isEdit?: boolean;
  isWithSum?: boolean;
  detailUrl?: string;
}) {
  const Load = () => {
    const dummy = [1, 2, 3, 4, 5];
    return dummy.map((idx: number) => (
      <tr key={idx}>
        <td
          className={`${
            !isCheck && "hidden"
          } h-auto w-auto border-collapse border-b-2 border-kGrey-100 px-2 py-3 xl:px-4`}
        >
          <Checkbox type={"check"} id={""} />
        </td>
        {column.map((idx: number) => {
          return (
            <td
              key={idx}
              className="h-auto w-auto border-collapse border-b-2 border-kGrey-100 px-2 py-3 text-center xl:px-4"
            >
              <div className="h-4 w-full animate-pulse bg-kGrey-100"></div>
            </td>
          );
        })}
        <td
          className={`${
            !detailUrl && "hidden"
          } h-auto w-auto border-collapse cursor-pointer border-b-2 border-kGrey-100 p-4 py-3 text-center text-kOrange-400`}
        >
          <p>Lihat Detail</p>
        </td>
        <td
          className={`${
            !isEdit && "hidden"
          } h-auto w-4 border-collapse cursor-pointer border-b-2 border-kGrey-100 p-4 py-3 text-center`}
        >
          <BiSolidPencil />
        </td>
      </tr>
    ));
  };

  var num = (page - 1) * dataLimit;

  const selectAll = () => {
    if (onSelected && selected) {
      if (selected.length == data.length) {
        onSelected([]);
      } else {
        const AllId = data.map((obj: any) => obj.id);
        onSelected(AllId);
      }
    }
  };

  return (
    <>
      <div className="flex overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th
                className={`${
                  !isCheck && "hidden"
                } h-auto w-auto border-collapse bg-kOrange-100 px-2 py-1 text-center font-normal xl:px-4`}
              >
                <Checkbox
                  checked={selected?.length == data.length && data.length != 0}
                  onChange={selectAll}
                  type={"check"}
                  id={""}
                />
              </th>
              {column.map((row: any, idx: number) => {
                return (
                  <th
                    key={idx}
                    className="h-auto w-auto border-collapse bg-kOrange-100 px-2 py-1 text-center font-normal xl:px-4"
                  >
                    {row}
                  </th>
                );
              })}
              <th
                className={`${
                  !detailUrl && "hidden"
                } h-auto w-auto border-collapse bg-kOrange-100 py-1 text-center font-normal`}
              >
                <p> </p>
              </th>
              <th
                className={`${
                  !isEdit && "hidden"
                } h-auto w-auto border-collapse bg-kOrange-100 py-1 text-center font-normal`}
              >
                <p> </p>
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <Load />
            ) : (
              Object.values(data).map((obj: any, idx: number) => {
                num++;
                var isChecked = selected?.includes(obj.id);
                const handleCheck = () => {
                  if (onSelected && selected) {
                    if (isChecked) {
                      onSelected(selected.filter((item) => item !== obj.id));
                    } else {
                      onSelected([...selected, obj.id]);
                    }
                  }
                };
                var id = -1;
                return (
                  <tr key={idx}>
                    <td
                      className={`${
                        !isCheck && "hidden"
                      } h-auto w-auto border-collapse border-b-2 border-kGrey-100 px-2 py-3 xl:px-4`}
                    >
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheck}
                        type={"check"}
                        id={""}
                      />
                    </td>
                    <td
                      className={`${
                        !isNum && "hidden"
                      } h-auto w-auto border-collapse border-b-2 border-kGrey-100 px-2 py-3 text-center xl:px-4`}
                    >
                      {num}
                    </td>
                    {Object.values(obj).map((row: any, idx: number) => {
                      if (idx == 0) {
                        id = row;
                        return;
                      }
                      return (
                        <td
                          key={idx}
                          className="h-auto w-auto border-collapse border-b-2 border-kGrey-100 px-2 py-3 text-center xl:px-4"
                        >
                          {row}
                        </td>
                      );
                    })}
                    <td
                      className={`${
                        !detailUrl && "hidden"
                      } h-auto w-auto border-collapse cursor-pointer border-b-2 border-kGrey-100 p-4 py-3 text-center`}
                    >
                      <Link
                        className="text-kOrange-400 hover:text-kOrange-300 active:text-kOrange-500"
                        to={`${detailUrl}/${id}`}
                      >
                        Lihat Detail
                      </Link>
                    </td>
                    <td
                      onClick={onEdit ? () => onEdit(idx) : undefined}
                      className={`${
                        !isEdit && "hidden"
                      } h-auto w-4 border-collapse cursor-pointer border-b-2 border-kGrey-100 p-4 py-3 text-center hover:text-kOrange-300 active:text-kOrange-400`}
                    >
                      <BiSolidPencil />
                    </td>
                  </tr>
                );
              })
            )}
            {isWithSum && (
              <tr className="w-full">
                <th className="h-auto w-auto border-collapse bg-kOrange-100 px-2 py-1 text-center font-semibold xl:px-4">
                  Total
                </th>
                <th className="h-auto w-auto border-collapse bg-kOrange-100 px-2 py-1 text-center font-semibold xl:px-4">
                  {data.reduce(
                    (total: any, { jumlah_akta }: any) => total + jumlah_akta,
                    0
                  )}
                </th>
                <th className="h-auto w-auto border-collapse bg-kOrange-100 px-2 py-1 text-center font-semibold xl:px-4">
                  {data.reduce(
                    (total: any, { jasa_bruto }: any) => total + jasa_bruto,
                    0
                  )}
                </th>
                <th className="h-auto w-auto border-collapse bg-kOrange-100 px-2 py-1 text-center font-semibold xl:px-4">
                  {data.reduce((total: any, { dpp }: any) => total + dpp, 0)}
                </th>
                <th className="h-auto w-auto border-collapse bg-kOrange-100 px-2 py-1 text-center font-semibold xl:px-4">
                  {data.reduce(
                    (total: any, { dpp_akumulasi }: any) =>
                      total + dpp_akumulasi,
                    0
                  )}
                </th>
                <th className="h-auto w-auto border-collapse bg-kOrange-100 px-2 py-1 text-center font-semibold xl:px-4">
                  {data.reduce(
                    (total: any, { pph_potong }: any) => total + pph_potong,
                    0
                  )}
                </th>
                <th className="h-auto w-auto border-collapse bg-kOrange-100 px-2 py-1 text-center font-semibold xl:px-4">
                  {data.reduce(
                    (total: any, { pajak_akumulasi }: any) =>
                      total + pajak_akumulasi,
                    0
                  )}
                </th>
                <th className="h-auto w-auto border-collapse bg-kOrange-100 px-2 py-1 text-center font-semibold xl:px-4">
                  {data.reduce(
                    (total: any, { transfer }: any) => total + transfer,
                    0
                  )}
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && data.length == 0 ? (
        <div className="mt-12 text-center text-12 xl:text-14">
          Data Tidak Ditemukan
        </div>
      ) : null}
    </>
  );
}

export default Table;
