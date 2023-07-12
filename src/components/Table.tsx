function Table({ data, column}: { data: any; column: any}) {
  return (
    <>
        <table className="flex h-[600px] w-[1200px] flex-col items-center overflow-y-visible">
          <thead>
            <tr>
              {column.map((row: any, idx: number) => {
                return (
                  <th key={idx} className = "h-auto w-[120px] bg-kOrange-100 py-1 font-normal">
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
                        className="h-auto w-[120px] text-center border-b-2 border-kGrey-100 py-3"
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
    </>
  );
}

export default Table;
