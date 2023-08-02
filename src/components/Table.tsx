import Checkbox from "./Checkbox";
import { BiSolidPencil } from "react-icons/bi";

function Table({
  data,
  column,
  isLoading,
  page,
  onEdit,
}: {
  data: any;
  column: any;
  isLoading: boolean;
  page: number;
  onEdit: (x: number) => void | undefined;
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

  var num = (page - 1) * 10;

  return (
    <>
      <div className="flex overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="h-auto w-auto border-collapse bg-kOrange-100 px-2 py-1 text-center font-normal xl:px-4">
                <Checkbox type={"check"} id={""} />
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
                return (
                  <tr key={idx}>
                    <td className="h-auto w-auto border-collapse border-b-2 border-kGrey-100 px-2 py-3 xl:px-4">
                      <Checkbox type={"check"} id={""} />
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
                      onClick={() => onEdit(idx)}
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
