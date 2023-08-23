import { FormatRupiah } from "@arismun/format-rupiah";
import Dropdown from "../../components/Dropdown";
import { useState } from "react";
import { dataMonth } from "../../data/month";
import del from "../../../public/assets/delete.svg";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

function DetailGaji() {
  const [totalGaji, setTotalGaji] = useState(0);
  const [totalPPH, setTotalPPH] = useState(0);
  const [period, setPeriod] = useState<{ value: string; label: string }>();
  const option = [
    { value: 1, label: "OmadWahyu" },
    { value: 2, label: "Akmal" },
  ];
  return (
    <>
      <div className="flex h-[1200px] w-full flex-col bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <h1 className="mb-12 hidden text-40 font-bold xl:block">Detail Gaji</h1>
        <div className="mb-5 flex w-full justify-between xl:justify-start">
          <p className="w-auto text-16 font-bold xl:w-[250px] md:text-24 ">
            Karyawan
          </p>
          <div className="w-[160px] md:w-[200px]">
            <Dropdown
              isClearable={false}
              placeholder={"Pilih Karyawan"}
              type={"karyawan"}
              options={option}
            />
          </div>
        </div>
        <div className="mb-5 flex w-full justify-between xl:justify-start">
          <p className="w-auto text-16 font-bold xl:w-[250px] md:text-24 ">
            Total Gaji
          </p>
          <p className="text-16 font-semibold text-kText xl:text-24">
            <FormatRupiah value={totalGaji} />
          </p>
        </div>
        <div className="mb-5 flex w-full justify-between xl:justify-start">
          <p className="w-auto text-16 font-bold xl:w-[250px] md:text-24 ">
            PPH
          </p>
          <p className="text-16 font-semibold text-kText xl:text-24">
            <FormatRupiah value={totalPPH} />
          </p>
        </div>
        <div className="mt-5 flex w-full flex-col justify-between gap-1 xl:flex-row">
          <p className="w-auto text-16 font-bold xl:w-[250px] md:text-24 ">
            Detail Gaji Bulanan
          </p>
          <div className="flex items-center justify-between xl:justify-start">
            <p className="w-auto text-center text-16 font-bold xl:w-[250px] md:text-24 ">
              Bulan
            </p>
            <div className="w-[160px] md:w-[200px]">
              <Dropdown
                placeholder={"Select Period"}
                type={"month"}
                options={dataMonth(new Date("01/01/2000"), new Date())}
                onChange={(e) => setPeriod(e!)}
              />
            </div>
          </div>
        </div>

        {/* dekstop */}
        <div className="mt-10 hidden max-h-10 gap-x-5 gap-y-5 xl:grid xl:grid-cols-2">
          <div className="h-[172px] rounded-[10px] bg-white drop-shadow-card">
            <div className="p-12">
              <div className="flex justify-between">
                <p className="text-[16px] font-bold xl:text-[24px]">
                  Gaji Pokok
                </p>
                <p className="text-16 font-semibold text-kText xl:text-24">
                  <FormatRupiah value={totalPPH} />
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <p className="text-20">Gaji Pokok</p>
                <p className="text-16 text-kText xl:text-20">
                  <FormatRupiah value={totalPPH} />
                </p>
              </div>
            </div>
          </div>

          <div className="h-[264px] overflow-auto rounded-[10px] bg-white drop-shadow-card">
            <div className="p-12">
              <div className="flex justify-between">
                <p className="text-[24px] font-bold">Variabel Bonus</p>
                <p className="text-16 font-semibold text-kText xl:text-24">
                  <FormatRupiah value={totalPPH} />
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <div className="flex w-[500px] items-center gap-3 rounded-[10px] border-2 border-black p-2">
                  <TextField type="standart" placeholder="Nama Bonus" />
                  <TextField type="standart" placeholder="Jumlah Bonus" />
                  <p className="text-16 font-semibold">X</p>
                  <div className="w-60">
                    <TextField type="standart" placeholder="Jumlah" />
                  </div>
                  <p className="text-20 font-semibold">=</p>
                  <p className="text-20 font-semibold">Total</p>
                </div>
                <button>
                  <img src={del} alt="" />
                </button>
              </div>
              <div className="mt-2 flex justify-between">
                <div className="flex w-[500px] items-center gap-3 rounded-[10px] border-2 border-black p-2">
                  <TextField type="standart" placeholder="Nama Bonus" />
                  <TextField type="standart" placeholder="Jumlah Bonus" />
                  <p className="text-16 font-semibold">X</p>
                  <div className="w-60">
                    <TextField type="standart" placeholder="Jumlah" />
                  </div>
                  <p className="text-20 font-semibold">=</p>
                  <p className="text-20 font-semibold">Total</p>
                </div>
                <button>
                  <img src={del} alt="" />
                </button>
              </div>
              <div className="mt-5 text-right">
                <Button type="button" text="Tambah Bonus +" style="primary" />
              </div>
            </div>
          </div>

          <div className="h-[172px] rounded-[10px] bg-white drop-shadow-card">
            <div className="p-12">
              <div className="flex justify-between">
                <p className="text-[24px] font-bold">Bonus Kehadiran</p>
                <p className="text-16 font-semibold text-kText xl:text-24">
                  <FormatRupiah value={totalPPH} />
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <p className="text-20">Gaji Harian</p>
                <p className="text-20">28 dari 30 hari</p>
              </div>
            </div>
          </div>

          <div className="h-[264px] overflow-auto rounded-[10px] bg-white drop-shadow-card">
            <div className="p-12">
              <div className="flex justify-between">
                <p className="text-[24px] font-bold">Variabel Bonus</p>
                <p className="text-16 font-semibold text-kText xl:text-24">
                  <FormatRupiah value={totalPPH} />
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <div className="flex w-[500px] items-center gap-3 rounded-[10px] border-2 border-black p-2">
                  <TextField type="standart" placeholder="Nama Bonus" />
                  <TextField type="standart" placeholder="Jumlah Bonus" />
                  <p className="text-16 font-semibold">X</p>
                  <div className="w-60">
                    <TextField type="standart" placeholder="Jumlah" />
                  </div>
                  <p className="text-20 font-semibold">=</p>
                  <p className="text-20 font-semibold">Total</p>
                </div>
                <button>
                  <img src={del} alt="" />
                </button>
              </div>
              <div className="mt-2 flex justify-between">
                <div className="flex w-[500px] items-center gap-3 rounded-[10px] border-2 border-black p-2">
                  <TextField type="standart" placeholder="Nama Bonus" />
                  <TextField type="standart" placeholder="Jumlah Bonus" />
                  <p className="text-16 font-semibold">X</p>
                  <div className="w-60">
                    <TextField type="standart" placeholder="Jumlah" />
                  </div>
                  <p className="text-20 font-semibold">=</p>
                  <p className="text-20 font-semibold">Total</p>
                </div>
                <button>
                  <img src={del} alt="" />
                </button>
              </div>
              <div className="mt-5 text-right">
                <Button type="button" text="Tambah Bonus +" style="primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="mt-5 flex flex-col gap-5 xl:hidden">
          <div className="h-[100px] rounded-[10px] bg-white drop-shadow-card">
            <div className="p-5">
              <div className="flex justify-between">
                <p className="text-16 sm:text-20 font-bold">Gaji Pokok</p>
                <p className="text-16 font-semibold text-kText xl:text-24">
                  <FormatRupiah value={totalPPH} />
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <p className="text-16 sm:text-20">Gaji Harian</p>
                <p className="text-16 text-kText xl:text-20">
                  <FormatRupiah value={totalPPH} />
                </p>
              </div>
            </div>
          </div>

          <div className="h-[100px] rounded-[10px] bg-white drop-shadow-card">
            <div className="p-5">
              <div className="flex justify-between">
                <p className="text-16 sm:text-20 font-bold">Bonus Kehadiran</p>
                <p className="text-16 font-semibold text-kText">
                  <FormatRupiah value={totalPPH} />
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <p className="text-16 sm:text-20">Gaji Harian</p>
                <p className="text-16">28 dari 30 hari</p>
              </div>
            </div>
          </div>

          <div className="h-[264px] overflow-auto rounded-[10px] bg-white drop-shadow-card">
            <div className="p-5 sm:p-12">
              <div className="flex justify-between">
                <p className="text-20 font-bold sm:text-24">Variabel Bonus</p>
                <p className="text-16 font-semibold text-kText xl:text-24">
                  <FormatRupiah value={totalPPH} />
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <div className="flex w-[300px] items-center gap-1 overflow-auto rounded-[10px] border-2 border-black p-2 sm:w-[500px] sm:gap-3">
                  <TextField type="standart" placeholder="Nama Bonus" />
                  <TextField type="standart" placeholder="Jumlah Bonus" />
                  <p className="text-14 font-semibold sm:text-20">X</p>
                  <div className="w-60">
                    <TextField type="standart" placeholder="Jumlah" />
                  </div>
                  <p className="text-14 font-semibold sm:text-20">=</p>
                  <p className="text-14 font-semibold sm:text-20">Total</p>
                </div>
                <button>
                  <img src={del} alt="" />
                </button>
              </div>
              <div className="mt-2 flex justify-between">
                <div className="flex w-[300px] items-center gap-1 overflow-auto rounded-[10px] border-2 border-black p-2 sm:w-[500px] sm:gap-3">
                  <TextField type="standart" placeholder="Nama Bonus" />
                  <TextField type="standart" placeholder="Jumlah Bonus" />
                  <p className="text-14 font-semibold sm:text-20">X</p>
                  <div className="w-60">
                    <TextField type="standart" placeholder="Jumlah" />
                  </div>
                  <p className="text-14 font-semibold sm:text-20">=</p>
                  <p className="text-14 font-semibold sm:text-20">Total</p>
                </div>
                <button>
                  <img src={del} alt="" />
                </button>
              </div>
              <div className="mt-5 text-right">
                <Button type="button" text="Tambah Bonus +" style="primary" />
              </div>
            </div>
          </div>

          <div className="h-[264px] overflow-auto rounded-[10px] bg-white drop-shadow-card">
            <div className="p-5 sm:p-12">
              <div className="flex justify-between">
                <p className="text-20 font-bold sm:text-24">Variabel Skill</p>
                <p className="text-16 font-semibold text-kText xl:text-24">
                  <FormatRupiah value={totalPPH} />
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <div className="flex w-[300px] items-center gap-1 overflow-auto rounded-[10px] border-2 border-black p-2 sm:w-[500px] sm:gap-3">
                  <TextField type="standart" placeholder="Manager" />
                  <TextField type="standart" placeholder="Rp 100.000" />
                  <p className="text-14 font-semibold sm:text-20">=</p>
                  <p className="text-14 font-semibold sm:text-20">Total</p>
                </div>
                <button>
                  <img src={del} alt="" />
                </button>
              </div>
              <div className="mt-2 flex justify-between">
                <div className="flex w-[300px] items-center gap-1 overflow-auto rounded-[10px] border-2 border-black p-2 sm:w-[500px] sm:gap-3">
                  <TextField type="standart" placeholder="Posisi" />
                  <TextField type="standart" placeholder="Besaran" />
                  <p className="text-14 font-semibold sm:text-20">=</p>
                  <p className="text-14 font-semibold sm:text-20">Total</p>
                </div>
                <button>
                  <img src={del} alt="" />
                </button>
              </div>
              <div className="mt-5 text-right">
                <Button type="button" text="Tambah Bonus +" style="primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailGaji;
