import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import Navbar from "../../components/Navbar";
import CardPajakPerusahaan from "./CardPajakPerusahaan";
import { FormatRupiah } from "@arismun/format-rupiah";
import { BiSolidPencil } from "react-icons/bi";
import { HiTrash } from "react-icons/hi";
import { IconContext } from "react-icons";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import TextField from "../../components/TextField";

function KoreksiCard({ value }: { value: number }) {
  return (
    <div className="mb-4 flex justify-between xl:gap-5">
      <p className=" w-2/5 xl:w-full">Penyusutan Kendaraan</p>
      <div className=" flex w-3/5 justify-end gap-3">
        <span className=" w-3/5 break-words text-end lg:w-full xl:w-full">
          <FormatRupiah value={value} />
          ,-
        </span>
        <BiSolidPencil />
        <IconContext.Provider
          value={{ color: "red", className: "global-class-name" }}
        >
          <div>
            <HiTrash />
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

function PajakPerusahaan() {
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState("Januari 2023");
  const koreksiType = [
    { value: "Positif", label: "Positif" },
    { value: "Negatif", label: "Negatif" },
  ];
  return (
    <>
      <Navbar active={5} />
      <Modal visible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Rekan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full items-center justify-between gap-16 xl:flex">
              <div className=" xl:w-1/2">
                <p className="mb-2 text-16 font-semibold">
                  Sifat Koreksi (Positif / Negatif)
                </p>
                <Dropdown placeholder="Sifat" type="sifat" />
              </div>
              <div className=" xl:w-1/2">
                <p className="mb-2 text-16 font-semibold">Jenis Koreksi</p>
                <Dropdown placeholder="Jenis" type="jenis" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jumlah Koreksi</p>
              <TextField
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowModal(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button text={"Tambah Data"} type={"button"} style={"primary"} />
          </div>
        </div>
      </Modal>
      <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <div className="xl:flex xl:justify-between xl:pr-16">
          <h1 className="hidden text-40 font-bold xl:block">
            Pajak Perusahaan
          </h1>
          <div className="flex items-center justify-between">
            <h2 className="text-20 font-bold lg:mr-10">Periode</h2>
            <div className="w-[160px] md:w-[200px]">
              <Dropdown placeholder={""} type={"month"} value={month} />
            </div>
          </div>
        </div>
        <div className="grid-cols-2 gap-x-12 xl:grid">
          <div className=" mt-5 rounded-[10px] bg-white p-[30px] drop-shadow-card">
            <div className=" md:flex md:justify-between ">
              <p className="text-20 font-bold">Total Pendapatan</p>
              <span className="text-20">
                <FormatRupiah value={100000000000} />
                ,-
              </span>
            </div>

            <hr className=" mb-4 mt-1 h-[2px] bg-kGrey-100" />
            <CardPajakPerusahaan label={"Jenis 1"} value={100000000000} />
            <CardPajakPerusahaan
              label={"Jenis Lain Kalo Ada"}
              value={100000000000}
            />
          </div>
          <div className=" mt-5 rounded-[10px] bg-white p-[30px] drop-shadow-card">
            <div className=" md:flex md:justify-between ">
              <p className="text-20 font-bold">Total Pengeluaran</p>
              <span className="text-20">
                <FormatRupiah value={100000000000} />
                ,-
              </span>
            </div>

            <hr className=" mb-4 mt-1 h-[2px] bg-kGrey-100" />
            <CardPajakPerusahaan label={"Jenis 1"} value={100000000000} />
            <CardPajakPerusahaan
              label={"Jenis Lain Kalo Ada"}
              value={100000000000}
            />
          </div>
        </div>
        <div className=" mt-3 w-full rounded-[10px] bg-white p-[30px] drop-shadow-card xl:mx-auto xl:w-fit">
          <div className=" xl:flex xl:items-center xl:gap-9">
            <p className=" text-20 font-bold">Laba Sebelum Pajak</p>
            <span className="text-20">
              <FormatRupiah value={100000000000} />
              ,-
            </span>
          </div>
          <div className=" mt-[25px]">
            <div className=" gap-10 xl:flex xl:justify-between">
              <div className="">
                <div className="flex items-center justify-between gap-3">
                  <p className=" text-20 font-bold">Koreksi Positif</p>
                  <Button
                    style="text"
                    type="button"
                    text="Tambah Koreksi"
                    onClick={() => setShowModal(true)}
                  />
                </div>
                <KoreksiCard value={100000000000} />
                <KoreksiCard value={100000000000} />
                <KoreksiCard value={100000000000} />
              </div>
              <div className="">
                <div className="mt-6 flex items-center justify-between xl:mt-0">
                  <p className=" text-20 font-bold">Koreksi Positif</p>
                  <Button
                    style="text"
                    type="button"
                    text="Tambah Koreksi"
                    onClick={() => setShowModal(true)}
                  />
                </div>
                <KoreksiCard value={100000000} />
              </div>
            </div>
            <div className=" mt-6">
              <p className="text-20 font-bold">Laba Bersih Fiskal</p>
              <span className="text-20">
                <FormatRupiah value={100000000000} />
                ,-
              </span>
            </div>
            <div className=" mt-6">
              <p className="text-20 font-bold">Pembulatan</p>
              <span className="text-20">
                <FormatRupiah value={100000000000} />
                ,-
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PajakPerusahaan;
