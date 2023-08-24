import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import Table from "../../components/Table";
import { dataYear } from "../../data/year";
import { getWithAuth } from "../../api/api";
import { toastError } from "../../components/Toast";
import { convertMonth } from "../../data/convertMonth";
import { useParams } from "react-router-dom";
import { formatRp } from "../../data/formatRp";

function DetailPajakRekan() {
  const { id } = useParams();

  const [isTableLoad, setIsTableLoad] = useState(false);

  //Field
  const [year, setYear] = useState<{ value: string; label: string }>(
    dataYear(new Date(), new Date())[0]
  );

  // Data
  const [data, setData] = useState([]);

  // Table
  const kolom = [
    "Bulan",
    "Jumlah Akta",
    "Jasa Bruto",
    "DPP",
    "DPP Akumulasi",
    "PPH Dipotong",
    "Pajak Akumulasi",
    "Transfer",
  ];

  const token = localStorage.getItem("access_token");
  const getData = async () => {
    setIsTableLoad(true);
    if (token) {
      try {
        const pajak_rekan = await getWithAuth(
          token,
          `pajak-rekan-by-id?limit=12&rekan_id=${id}&year=${
            year ? year.value : ""
          }`
        );
        setData(
          pajak_rekan.data.data.table.data.map((data: any) => {
            return {
              id: data.rekan_id,
              bulan: convertMonth(data.bulan),
              jumlah_akta: data.jumlah_akta,
              jasa_bruto: formatRp(data.jasa_bruto),
              dpp: formatRp(data.dpp),
              dpp_akumulasi: formatRp(data.dpp_akumulasi),
              pph_potong: formatRp(data.pph),
              pajak_akumulasi: formatRp(data.pph_akumulasi),
              transfer: formatRp(data.transfer),
            };
          })
        );
      } catch (error) {
        toastError("Get Data Table Failed");
      } finally {
        setIsTableLoad(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [year]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-9 pt-[104px] xl:px-24">
      <h1 className="mb-12 hidden text-40 font-bold xl:block">
        Detail Pajak Rekan
      </h1>

      <div className="mb-5 flex w-full items-center justify-between xl:justify-start">
        <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24 ">
          Periode
        </p>
        <div className="w-[160px] md:w-[200px]">
          <Dropdown
            isClearable={false}
            placeholder={"Select Period"}
            type={"year"}
            value={year}
            options={dataYear(new Date("01/01/2000"), new Date())}
            onChange={(e) => setYear(e!)}
          />
        </div>
      </div>
      <p className="mb-5 block text-16 font-bold xl:hidden xl:text-24">
        Daftar Pajak Rekan
      </p>
      <div className="flex grow flex-col rounded-lg bg-white py-5 shadow-card">
        <div className="mb-5 flex w-full items-center justify-between gap-1 px-3">
          <p className="hidden text-16 font-bold xl:block xl:text-24">
            Daftar Pajak Rekan
          </p>
        </div>
        <Table
          data={data}
          column={kolom}
          isLoading={isTableLoad}
          page={1}
          dataLimit={12}
          isCheck={false}
          isNum={false}
          isEdit={false}
          isWithSum
        />
      </div>
    </div>
  );
}

export default DetailPajakRekan;
