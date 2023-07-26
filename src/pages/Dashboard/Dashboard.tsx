import { useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";

function Dashboard() {
  const [month, setMonth] = useState("Januari 2023");
  const data = [
    {
      id: 1,
      tanggal: "2 Mei 2023",
      no_awal: "uhuyy",
      no_akhir: 2,
      jumlah_akta: 20,
    },
    {
      id: 2,
      tanggal: "3 Mei 2023",
      no_awal: "uhuyy",
      no_akhir: 2,
      jumlah_akta: 20,
    },
    {
      id: 3,
      tanggal: "4 Juni 2023",
      no_awal: "uhuyy",
      no_akhir: 2,
      jumlah_akta: 20,
    },
  ];
  const kolom = ["No", "Tanggal", "No.Awal", "No.Akhir", "Jumlah Akta"];
  return (
    <>
      <Navbar active={0} />
      <div className="min-h-screen w-full bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <div className="xl:flex xl:justify-between xl:pr-16">
          <h1 className="hidden text-40 font-bold xl:block">Dashboard</h1>
          <div className="flex items-center justify-between">
            <h2 className="text-16 font-bold lg:mr-10 xl:text-24">Periode</h2>
            <div className="w-[160px] md:w-[200px]">
              <Dropdown
                placeholder={""}
                type={"month"}
                value={month}
                options={undefined}
              />
            </div>
          </div>
        </div>
        <div className="mt-10 flex w-full flex-wrap justify-center gap-5">
          {/* PENDAPATAN */}
          <div className="h-auto w-full rounded-[10px] bg-white p-[30px] drop-shadow-card xl:w-[49%] xl:p-[50px]">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
              <h1 className="text-20 font-bold xl:text-24">Pendapatan</h1>
              <h1 className="whitespace-nowrap text-20 font-semibold text-kGreen xl:text-28 ">
                Rp 100.000.000.000,-
              </h1>
            </div>
            <hr className="my-3 bg-black" />
            <div className="my-3 flex items-center justify-between">
              <h1 className="text-14 font-medium xl:text-20">Jenis 1</h1>
              <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                Rp 100.000.000.000,-
              </h1>
            </div>
            <div className="my-3 flex items-center justify-between">
              <h1 className="text-14 font-medium xl:text-20">Jenis 2</h1>
              <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                Rp 100.000.000.000,-
              </h1>
            </div>
            <div className="my-3 flex items-center justify-between">
              <h1 className="text-14 font-medium xl:text-20">
                Jenis Lain Kalo Ada
              </h1>
              <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                Rp 100.000.000.000,-
              </h1>
            </div>
            <div className="mt-5 flex w-full justify-center xl:justify-end">
              <Button
                text={"Tambah Pendapatan +"}
                type={"button"}
                style={"primary"}
              />
            </div>
          </div>

          {/* PENGELUARAN */}
          <div className="h-auto w-full rounded-[10px] bg-white p-[30px] drop-shadow-card xl:w-[49%] xl:p-[50px]">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
              <h1 className="text-20 font-bold xl:text-24">Pengeluaran</h1>
              <h1 className="whitespace-nowrap text-20 font-semibold text-kRed xl:text-28 ">
                Rp 100.000.000.000,-
              </h1>
            </div>
            <hr className="my-3 bg-black" />
            <div className="my-3 flex items-center justify-between">
              <h1 className="text-14 font-medium xl:text-20">Jenis 1</h1>
              <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                Rp 100.000.000.000,-
              </h1>
            </div>
            <div className="my-3 flex items-center justify-between">
              <h1 className="text-14 font-medium xl:text-20">Jenis 2</h1>
              <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                Rp 100.000.000.000,-
              </h1>
            </div>
            <div className="my-3 flex items-center justify-between">
              <h1 className="text-14 font-medium xl:text-20">
                Jenis Lain Kalo Ada
              </h1>
              <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                Rp 100.000.000.000,-
              </h1>
            </div>
            <div className="mt-5 flex w-full justify-center xl:justify-end">
              <Button
                text={"Tambah Pengeluaran +"}
                type={"button"}
                style={"primary"}
              />
            </div>
          </div>

          {/* PAJAK REKAN */}
          <div className="h-auto w-full rounded-[10px] bg-white p-[30px] drop-shadow-card xl:w-[49%] xl:p-[50px]">
            <h1 className="text-20 font-bold xl:text-24">Pajak Rekan</h1>
            <hr className="my-3 bg-black" />
            <div className="my-3 flex items-center justify-between">
              <h1 className="text-14 font-semibold xl:text-20">
                No. Akta Tersisa
              </h1>
              <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                71-79, 100
              </h1>
            </div>
            <div className="my-3 flex items-center justify-between">
              <h1 className="text-14 font-semibold xl:text-20">Daftar Akta</h1>
              <Button
                text={"Tambah Data +"}
                type={"button"}
                style={"primary"}
              />
            </div>
            <div className="">
              <Table data={data} column={kolom} />
            </div>
          </div>

          {/* STOK BARANG */}
          <div className="w-full xl:w-[49%]">
            <div className="h-auto w-full rounded-[10px] bg-white p-[30px] drop-shadow-card xl:p-[50px]">
              <h1 className="text-20 font-bold xl:text-24">Stok Barang</h1>
              <hr className="my-3 bg-black" />
              <h1 className="my-3 text-14 font-semibold xl:text-20">
                Stok Hampir Habis
              </h1>

              <div className="my-3 flex items-center justify-between">
                <h1 className="text-14 font-medium xl:text-20">Meterai 1000</h1>
                <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                  1 pcs
                </h1>
              </div>
              <div className="my-3 flex items-center justify-between">
                <h1 className="text-14 font-medium xl:text-20">Galon</h1>
                <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                  1 Galon
                </h1>
              </div>
              <div className="mt-5 flex w-full justify-center xl:justify-end">
                <Button
                  text={"Ambil Barang +"}
                  type={"button"}
                  style={"primary"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
