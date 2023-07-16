import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import Navbar from "../../components/Navbar";
import CardPajakPerusahaan from "./CardPajakPerusahaan";

function PajakPerusahaan() {
  const [month, setMonth] = useState("Januari 2023");
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <div className="xl:flex xl:justify-between">
          <h1 className="mb-12 hidden text-40 font-bold lg:block">
            Pajak Perusahaan
          </h1>
          <div className="mb-5 flex flex-col justify-between gap-11 xl:flex-row">
            <div className=" flex w-full items-center justify-between xl:justify-start">
              <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24 ">
                Periode
              </p>
              <div className="relative z-10 w-[180px] drop-shadow-button">
                <Dropdown placeholder={""} type={"month"} value={month} />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid-cols-2 gap-12 xl:grid">
            <CardPajakPerusahaan />
            <CardPajakPerusahaan />
          </div>
          <div className=" mt-3 w-full rounded-[10px] bg-white p-[30px] drop-shadow-card xl:mx-auto xl:w-fit">
            <div className=" xl:flex xl:items-center xl:gap-9">
              <p className=" text-20 font-bold">Laba Sebelum Pajak</p>
              <p className=" text-20">Rp100.000.000.000,-</p>
            </div>
            <div className=" mt-[25px]">
              <div className=" gap-10 xl:flex xl:justify-between">
                <div className="">
                  <div className="flex items-center justify-between">
                    <p className=" text-20 font-bold">Koreksi Positif</p>
                    <p className=" text-16 font-light text-kOrange-400">
                      Tambah Koreksi
                    </p>
                  </div>
                  <div className="flex justify-between xl:gap-5">
                    <p className=" w-2/5 xl:w-full">Penyusutan Kendaraan</p>
                    <div className=" flex w-3/5 justify-end ">
                      <p className=" w-3/5 break-words text-end lg:w-full xl:w-full">
                        Rp100.000.000.000.000,-
                      </p>
                      <img src="" alt="" />
                      <img src="" alt="" />
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="mt-6 flex items-center justify-between xl:mt-0">
                    <p className=" text-20 font-bold">Koreksi Positif</p>
                    <p className=" text-16 font-light text-kOrange-400">
                      Tambah Koreksi
                    </p>
                  </div>
                  <div className="flex justify-between xl:gap-5">
                    <p className=" w-2/5 xl:w-full ">Penyusutan Kendaraan</p>
                    <div className=" flex w-3/5 justify-end">
                      <p className=" w-3/5 break-words text-end lg:w-full">
                        Rp100.000.000.000.000,-
                      </p>
                      <img src="" alt="" />
                      <img src="" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" mt-6">
                <p className="text-20 font-bold">Laba Bersih Fiskal</p>
                <p className=" text-20">Rp100.000.000.000.000,-</p>
              </div>
              <div className=" mt-6">
                <p className="text-20 font-bold">Pembulatan</p>
                <p className="text-20">Rp100.000.000.000.000,-</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PajakPerusahaan;
