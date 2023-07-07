function Table({ data, column }: { data: any; column: any }) {
  return (
    <>
      <div className="flex h-auto w-full items-center justify-center">
        <table className="flex h-[600px] w-[1200px] flex-col items-center justify-center">
          <thead>
            <tr>
              {column.map((row: any, idx: number) => {
                return (
                  <th key={idx} className="w-[200px] bg-[#FFD7BC] px-12 py-1 font-normal">
                    {row}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="flex flex-col items-center justify-center">
            {Object.values(data).map((obj: any, idx: number) => {
              return (
                <tr key={idx} className="flex items-center justify-center">
                  {Object.values(obj).map((row: any, idx: number) => {
                    return (
                      <td
                        key={idx}
                        className="flex w-[200px] items-center justify-center border-b-2 border-[#B8B5B5] py-3"
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
