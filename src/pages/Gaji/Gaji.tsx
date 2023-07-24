import { useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Navbar from "../../components/Navbar";
import Paginate from "../../components/Paginate";
import Table from "../../components/Table";
import TextField from "../../components/TextField";
import Modal from "../../components/Modal";
import DateFieldNormal from "../../components/DateFieldNormal";
import TextArea from "../../components/TextArea";

function Gaji() {
  const [month, setMonth] = useState("Januari 2023");
  const [showModal, setShowModal] = useState(false);
  const data = [
    {
      id: 1,
      nama: "Vixell",
      kehadiran: "50/55",
      jenis: "Tetap",
      jumlahGaji: "Rp. 5.000.000,-",
      jumlahBonus: "Rp. 200.000,-",
      pphDipotong: "Rp. 200.000,-",
      pajakAkumulasi: "Rp. 200.000,-",
      transfer: "Rp. 200.000,-",
    },
    {
      id: 2,
      nama: "Vixell",
      kehadiran: "50/55",
      jenis: "Tetap",
      jumlahGaji: "Rp. 5.000.000,-",
      jumlahBonus: "Rp. 200.000,-",
      pphDipotong: "Rp. 200.000,-",
      pajakAkumulasi: "Rp. 200.000,-",
      transfer: "Rp. 200.000,-",
    },
  ];
  const kolom = [
    "No",
    "Nama Karyawan",
    "Kehadiran",
    "Jenis Gaji",
    "Jumlah Gaji",
    "Jumlah Bonus",
    "PPH Dipotong",
    "Pajak Akumulasi",
    "Transfer",
  ];
  return (
    <>
      <Navbar active={6} />
      <Modal visible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Karyawan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama Karyawan</p>
              <TextField
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Masukkan Nama Karyawan"}
                helpertext={""}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis Gaji</p>
              <Dropdown placeholder={"Jenis"} type={"Jenis"} />
            </div>
          </div>
          <div className="flex flex-col justify-between xl:flex-row xl:gap-4">
            <div className="w-full xl:w-1/2"></div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jumlah Gaji</p>
              <TextField
                style={""}
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
        <h1 className="mb-12 hidden text-40 font-bold xl:block">Gaji</h1>
        <div className="mb-5 flex w-full justify-between xl:justify-start">
          <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24">
            Total Gaji
          </p>
          <p className="text-16 font-semibold text-kText xl:text-24">
            Rp 100.000.000.000000,-
          </p>
        </div>
        <div className="mb-5 flex flex-col justify-between gap-11 xl:flex-row">
          <div className="flex w-full items-center justify-between xl:justify-start">
            <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24 ">
              Periode
            </p>
            <div className="w-[160px] md:w-[200px]">
              <Dropdown placeholder={""} type={"month"} value={month} />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowModal(true)}
              text={"Tambah Data +"}
              type={"button"}
              style={"primary"}
            />
          </div>
        </div>
        <p className="mb-5 block text-16 font-bold xl:hidden xl:text-24">
          Daftar Gaji
        </p>
        <div className="flex grow flex-col rounded-lg bg-white py-3 shadow-card">
          <div className="mb-5 flex w-full items-center justify-between gap-1 px-3">
            <p className="hidden text-16 font-bold xl:block xl:text-24">
              Daftar Gaji
            </p>
            <div className="flex items-center gap-2">
              <TextField
                type={"search"}
                label={""}
                placeholder={"Cari"}
                helpertext={""}
              />
              <Button text={"Filter"} type={"button"} style={"seccondary"} />
            </div>
            <Button text={"Hapus"} type={"button"} style={"delete"} />
          </div>
          <Table data={data} column={kolom} />
          <div className="mt-8 flex w-full grow flex-col items-center justify-between lg:flex-row lg:items-end">
            <p className="hidden px-3 lg:block">
              Menunjukkan Entri 1 sampai xx dari xx
            </p>
            <Paginate totalPages={10} />
            <p className="visible px-3 text-12 text-kText lg:invisible lg:text-16">
              Menunjukkan Entri 1 sampai xx dari xx
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gaji;
