import { useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Navbar from "../../components/Navbar";
import TextField from "../../components/TextField";
import Table from "../../components/Table";
import Paginate from "../../components/Paginate";
import Modal from "../../components/Modal";
import DateFieldNormal from "../../components/DateFieldNormal";
import TextArea from "../../components/TextArea";

function Pendapatan() {
  const [month, setMonth] = useState("Januari 2023");
  const [showTambahPendapatan, setShowTambahPendapatan] = useState(false);
  const [showEditPendapatan, setShowEditPendapatan] = useState(false);

  const data = [
    {
      id: 1,
      tanggal: "2 Mei 2023",
      kategori: "uhuyy",
      jumlah: 2,
      pengirim: "kopeng",
      notes:
        "Lorem Ipsum asjausyuav oaosuba hatyss aushsh ashyab iabsauyvsa aaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa",
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
  const kolom = ["No", "Tanggal", "Kategori", "Jumlah", "Pengirim", "Notes"];
  return (
    <>
      <Navbar active={1} />
      <Modal
        visible={showTambahPendapatan}
        onClose={() => setShowTambahPendapatan(false)}
      >
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Pendapatan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Tanggal</p>
              <DateFieldNormal text={"Masukkan Tanggal"} />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Kategori</p>
              <Dropdown placeholder={"Kategori"} type={"Kategori"} />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jumlah Pendapatan</p>
              <TextField
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis</p>
              <Dropdown placeholder={"Jenis"} type={"Jenis"} />
            </div>
          </div>
          <div className="w-full">
            <p className="mb-2 text-16 font-semibold">Deskripsi</p>
            <TextArea
              style={""}
              label={""}
              placeholder={"Deskripsi"}
              helpertext={""}
            />
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowTambahPendapatan(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button text={"Simpan Data"} type={"button"} style={"primary"} />
          </div>
        </div>
      </Modal>

      <Modal
        visible={showEditPendapatan}
        onClose={() => setShowEditPendapatan(false)}
      >
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Edit Pendapatan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Tanggal</p>
              <DateFieldNormal text={"Masukkan Tanggal"} />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Kategori</p>
              <Dropdown placeholder={"Kategori"} type={"Kategori"} />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jumlah Pendapatan</p>
              <TextField
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis</p>
              <Dropdown placeholder={"Jenis"} type={"Jenis"} />
            </div>
          </div>
          <div className="w-full">
            <p className="mb-2 text-16 font-semibold">Deskripsi</p>
            <TextArea
              style={""}
              label={""}
              placeholder={"Deskripsi"}
              helpertext={""}
            />
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowEditPendapatan(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button text={"Edit Data"} type={"button"} style={"primary"} />
          </div>
        </div>
      </Modal>

      <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <h1 className="mb-12 hidden text-40 font-bold xl:block">Pendapatan</h1>
        <div className="mb-5 flex w-full justify-between xl:justify-start">
          <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24">
            Total Pendapatan
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
              onClick={() => setShowTambahPendapatan(true)}
              text={"Tambah Data +"}
              type={"button"}
              style={"primary"}
            />
            <Button
              text={"Tambah Kategori +"}
              type={"button"}
              style={"third"}
            />
          </div>
        </div>
        <p className="mb-5 block text-16 font-bold xl:hidden xl:text-24">
          Daftar Pendapatan
        </p>
        <div className="flex grow flex-col rounded-lg bg-white py-3 shadow-card">
          <div className="mb-5 flex w-full items-center justify-between gap-1 px-3">
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

export default Pendapatan;
