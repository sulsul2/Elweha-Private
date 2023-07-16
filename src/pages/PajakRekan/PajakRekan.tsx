import { useState } from "react";
import Navbar from "../../components/Navbar";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Paginate from "../../components/Paginate";
import TextField from "../../components/TextField";

function PajakRekan() {
  const [month, setMonth] = useState("Januari 2023");
  const data = [
    {
      id: 1,
      nama: "Vixell",
      biayaJasa: "Rp. 150.000.000,-",
      jumlahAkta: 130000,
      jasaBruto: "Rp. 150.000.000,-",
      dpp: "Rp. 150.000.000,-",
      dppAkumulasi: "Rp. 150.000.000,-",
      pphPotong: "Rp. 150.000.000,-",
      pajakAkumulasi: "Rp. 150.000.000,-",
      transfer: "Rp. 150.000,-",
    },
    {
      id: 2,
      nama: "Vixell",
      biayaJasa: "Rp. 150.000.000,-",
      jumlahAkta: 130000,
      jasaBruto: "Rp. 150.000.000,-",
      dpp: "Rp. 150.000.000,-",
      dppAkumulasi: "Rp. 150.000.000,-",
      pphPotong: "Rp. 150.000.000,-",
      pajakAkumulasi: "Rp. 150.000.000,-",
      transfer: "Rp. 150.000,-",
    },
    {
      id: 3,
      nama: "Vixell",
      biayaJasa: "Rp. 150.000.000,-",
      jumlahAkta: 130000,
      jasaBruto: "Rp. 150.000.000,-",
      dpp: "Rp. 150.000.000,-",
      dppAkumulasi: "Rp. 150.000.000,-",
      pphPotong: "Rp. 150.000.000,-",
      pajakAkumulasi: "Rp. 150.000.000,-",
      transfer: "Rp. 150.000,-",
    },
  ];
  const data1 = [
    {
      id: 1,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 2,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 3,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 4,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 5,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 6,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 7,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 8,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 9,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 10,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
  ];
  const kolom = [
    "No",
    "Nama Rekan",
    "Biaya Jasa",
    "Jumlah Akta",
    "Jasa Bruto",
    "DPP",
    "DPP Akumulasi",
    "PPH Dipotong",
    "Pajak Akumulasi",
    "Transfer",
  ];
  const kolom1 = [
    "No",
    "Tanggal",
    "No.Awal",
    "No.Akhir",
    "Jumlah Akta",
    "Terakhir Diupdate",
  ];
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-9 pt-[104px] xl:px-24">
        <h1 className="mb-12 hidden text-40 font-bold xl:block">Pajak Rekan</h1>
        <div className="mb-5 flex w-full justify-between xl:justify-start">
          <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24">
            Total Transfer
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
            <div className="w-[180px] drop-shadow-button">
              <Dropdown placeholder={""} type={"month"} value={month} />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button text={"Tambah Rekan +"} type={"button"} style={"primary"} />
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
      {/* daftar akta */}
      <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-24  xl:px-48">
        <div className="hidden xl:text-end xl:block pb-1">
          <Button text={"Tambah Data +"} type={"button"} style={"primary"} />
        </div>
        <p className="mb-5 block text-16 font-bold xl:hidden xl:text-24">
          Daftar Akta
        </p>
        <div className="block xl:hidden xl:justify-end pb-1">
          <Button text={"Tambah Data +"} type={"button"} style={"primary"} />
        </div>
        <div className="flex grow flex-col rounded-lg bg-white py-3 shadow-card">
          <div className="mb-5 flex w-full items-center justify-between gap-1 px-3">
            <p className="hidden text-16 font-bold xl:block xl:text-24">
              Daftar Akta
            </p>
            <div className="flex items-center gap-2">
              <Dropdown placeholder={"Pilih Rekan"} type={"month"} value={month} />
            </div>
            <Button text={"Hapus"} type={"button"} style={"delete"} />
          </div>
          <Table data={data1} column={kolom1} />
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

export default PajakRekan;
