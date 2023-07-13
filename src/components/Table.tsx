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
                    className="h-auto w-auto border-collapse bg-kOrange-100 py-1 px-16 xl:px-8 text-center font-normal"
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
                        className="h-auto w-auto border-collapse border-b-2 border-kGrey-100 py-3 px-16 xl:px-8 text-center"
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
