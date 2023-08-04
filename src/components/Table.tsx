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
}: {
  data: any;
  column: any;
  isLoading: boolean;
  page: number;
  dataLimit: number;
  onEdit?: (x: number) => void | undefined;
  onSelected?: (x: Array<number>) => void | undefined;
  selected?: Array<number>;
}) {
  const Load = () => {
    const dummy = [1, 2, 3, 4, 5, 6, 7];
    return dummy.map((idx: number) => (
      <tr key={idx}>
        <td className="h-auto w-auto border-collapse border-b-2 border-kGrey-100 px-2 py-3 text-center xl:px-4">
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
        <td className="h-auto w-auto border-collapse cursor-pointer border-b-2 border-kGrey-100 py-3 text-center">
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
              <th className="h-auto w-auto border-collapse bg-kOrange-100 px-2 py-1 text-center font-normal xl:px-4">
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
              <th className="h-auto w-auto border-collapse bg-kOrange-100 py-1 text-center font-normal">
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
                return (
                  <tr key={idx}>
                    <td className="h-auto w-auto border-collapse border-b-2 border-kGrey-100 px-2 py-3 xl:px-4">
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheck}
                        type={"check"}
                        id={""}
                      />
                    </td>
                    <td className="h-auto w-auto border-collapse border-b-2 border-kGrey-100 px-2 py-3 text-center xl:px-4">
                      {num}
                    </td>
                    {Object.values(obj).map((row: any, idx: number) => {
                      if (idx == 0) {
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
                      onClick={onEdit ? () => onEdit(idx) : undefined}
                      className="h-auto w-auto border-collapse cursor-pointer border-b-2 border-kGrey-100 py-3 text-center hover:text-kOrange-300 active:text-kOrange-400"
                    >
                      <BiSolidPencil />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
