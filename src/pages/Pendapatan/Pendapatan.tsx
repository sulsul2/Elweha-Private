import { useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Navbar from "../../components/Navbar";

function Pendapatan() {
  const [month, setMonth] = useState("Januari 2023");
  return (
    <>
      <Navbar />
      <div className="w-full px-5 pt-[104px] xl:px-24">
        <h1 className="mb-12 text-40 font-bold">Pendapatan</h1>
        <div className="mb-5 flex w-full justify-between lg:justify-start lg:gap-4">
          <p className="text-24 font-bold">Total Pendapatan</p>
          <p className="text-24 font-semibold text-kText">
            Rp 100.000.000.000,-
          </p>
        </div>
        <div className="flex flex-col justify-between gap-11 lg:flex-row">
          <div className="flex w-full justify-between lg:justify-start lg:gap-4">
            <p className="text-24 font-bold">Periode</p>
            <div className="w-[180px] drop-shadow-button">
              <Dropdown placeholder={""} type={"month"} value={month} />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4">
            <Button text={"Tambah Data +"} type={"button"} style={"primary"} />
            <Button text={"Tambah Kategori +"} type={"button"} style={"third"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Pendapatan;
