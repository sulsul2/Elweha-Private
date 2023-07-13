import { useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Navbar from "../../components/Navbar";
import TextField from "../../components/TextField";
import Table from "../../components/Table";
import Paginate from "../../components/Paginate";

function Pengeluaran() {
  const [month, setMonth] = useState("Januari 2023");
  const data = [
    {
      id: 1,
      tanggal: "2 Mei 2023",
      kategori: "uhuyy",
      jenis: "kopeng",
      jumlah: 2,
      notes:
        "Lorem Ipsum asjausyuav oaosuba hatyss aushsh ashyab iabsauyvsa aaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa",
    },
    {
      id: 2,
      tanggal: "3 Mei 2023",
      kategori: "uhuyy",
      jenis: "kopeng",
      jumlah: 2,
      notes: "Lorem Ipsum",
    },
    {
      id: 3,
      tanggal: "4 Juni 2023",
      kategori: "uhuyy",
      jenis: "kopeng",
      jumlah: 2,
      notes: "Lorem Ipsum",
    },
  ];
  const kolom = ["No", "Tanggal", "Kategori", "Jenis", "Jumlah", "Notes"];
  return (
    <>
      <Navbar />
      <div className="w-full px-5 pt-[104px] xl:px-24">
        <h1 className="mb-12 hidden text-40 font-bold xl:block">Pengeluaran</h1>
        <div className="mb-5 flex w-full justify-between lg:justify-start lg:gap-4">
          <p className="text-16 font-bold xl:text-24">Total Pengeluaran</p>
          <p className="text-16 font-semibold text-kText xl:text-24">
            Rp 100.000.000.000,-
          </p>
        </div>
        <div className="mb-5 flex flex-col justify-between gap-11 lg:flex-row">
          <div className="flex w-full justify-between lg:justify-start lg:gap-4">
            <p className="text-16 font-bold xl:text-24">Periode</p>
            <div className="w-[180px] drop-shadow-button">
              <Dropdown placeholder={""} type={"month"} value={month} />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 lg:justify-end">
            <Button text={"Tambah Data +"} type={"button"} style={"primary"} />
            <Button
              text={"Tambah Kategori +"}
              type={"button"}
              style={"third"}
            />
          </div>
        </div>
        <p className="mb-5 block text-16 font-bold xl:hidden xl:text-24">
          Daftar Pengeluaran
        </p>
        <div className="mb-5 flex w-full items-center justify-between gap-1">
          <p className="hidden text-16 font-bold xl:block xl:text-24">
            Daftar Pendapatan
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
        <div className="mt-8">
          <Paginate totalPages={10} />
        </div>
      </div>
    </>
  );
}

export default Pengeluaran;
