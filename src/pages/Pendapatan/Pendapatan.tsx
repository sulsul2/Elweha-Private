import { useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Navbar from "../../components/Navbar";
import TextField from "../../components/TextField";
import Table from "../../components/Table";

function Pendapatan() {
  const [month, setMonth] = useState("Januari 2023");
  const data = [
    {
      id: 1,
      tanggal: "2 Mei 2023",
      kategori: "uhuyy",
      jumlah: 2,
      pengirim: "kopeng",
      notes: "Lorem Ipsum asjausyuav oaosuba hatyss aushsh ashyab iabsauyvsa aaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa",
    },
    {
      id: 2,
      tanggal: "3 Mei 2023",
      kategori: "uhuyy",
      jumlah: 2,
      pengirim: "kopeng",
      notes: "Lorem Ipsum",
    },
    {
      id: 3,
      tanggal: "4 Juni 2023",
      kategori: "uhuyy",
      jumlah: 2,
      pengirim: "kopeng",
      notes: "Lorem Ipsum",
    },
  ];
  const kolom = [
    "No",
    "Tanggal",
    "Kategori",
    "Jumlah",
    "Pengirim",
    "Notes",
  ];
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
        <div className="mb-5 flex flex-col justify-between gap-11 lg:flex-row">
          <div className="flex w-full justify-between lg:justify-start lg:gap-4">
            <p className="text-24 font-bold">Periode</p>
            <div className="w-[180px] drop-shadow-button">
              <Dropdown placeholder={""} type={"month"} value={month} />
            </div>
          </div>
          <div className="flex w-full justify-center lg:justify-end gap-4">
            <Button text={"Tambah Data +"} type={"button"} style={"primary"} />
            <Button
              text={"Tambah Kategori +"}
              type={"button"}
              style={"third"}
            />
          </div>
        </div>
        <div className="mb-5 flex w-full items-center justify-between px-5">
          <p className="text-24 font-bold">Daftar Pendapatan</p>
          <div className="flex gap-2">
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
      </div>
    </>
  );
}

export default Pendapatan;
