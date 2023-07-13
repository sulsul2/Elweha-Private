function Table({ data, column }: { data: any; column: any }) {
  return (
    <>
      <div className="flex overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
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
            </tr>
          </thead>
          <tbody>
            {Object.values(data).map((obj: any, idx: number) => {
              return (
                <tr key={idx}>
                  {Object.values(obj).map((row: any, idx: number) => {
                    return (
                      <td
                        key={idx}
                        className="h-auto w-auto border-collapse border-b-2 border-kGrey-100 px-2 py-3 text-center xl:px-4"
                      >
                        {row}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
