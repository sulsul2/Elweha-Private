import { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Navbar from "../../components/Navbar";
import Paginate from "../../components/Paginate";
import Table from "../../components/Table";
import TextField from "../../components/TextField";
import Dropdown from "../../components/Dropdown";

function DaftarAkun() {
  const [showTambahAkun, setShowTambahAkun] = useState(false);
  const [showEditAkun, setShowEditAkun] = useState(false);
  const data = [
    {
      id: 1,
      nama: "Vixel",
      username: "uhuyy",
      role: "User",
    },
    {
      id: 2,
      nama: "Vixel",
      username: "uhuyy",
      role: "User",
    },
    {
      id: 3,
      nama: "Vixel",
      username: "uhuyy",
      role: "User",
    },
    {
      id: 4,
      nama: "Vixel",
      username: "uhuyy",
      role: "User",
    },
  ];
  const kolom = ["No", "Nama", "Username", "Role"];
  return (
    <>
      <Navbar />
      <Modal visible={showTambahAkun} onClose={() => setShowTambahAkun(false)}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Akun
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama</p>
              <TextField
                type={"standart"}
                label={""}
                placeholder={"Masukkan Nama"}
                helpertext={""}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Username</p>
              <TextField
                type={"standart"}
                label={""}
                placeholder={"Masukkan Username"}
                helpertext={""}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Password</p>
              <TextField
                type={"standart"}
                label={""}
                placeholder={"Masukkan Password"}
                helpertext={""}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Role</p>
              <Dropdown placeholder={"Role"} type={"Role"} />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowTambahAkun(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button text={"Tambah Akun"} type={"button"} style={"primary"} />
          </div>
        </div>
      </Modal>

      <Modal visible={showEditAkun} onClose={() => setShowEditAkun(false)}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Edit Akun
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama</p>
              <TextField
                type={"standart"}
                label={""}
                placeholder={"Masukkan Nama"}
                helpertext={""}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Username</p>
              <TextField
                type={"standart"}
                label={""}
                placeholder={"Masukkan Username"}
                helpertext={""}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Password</p>
              <TextField
                type={"standart"}
                label={""}
                placeholder={"Masukkan Password"}
                helpertext={""}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Role</p>
              <Dropdown placeholder={"Role"} type={"Role"} />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowEditAkun(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button text={"Edit Akun"} type={"button"} style={"primary"} />
          </div>
        </div>
      </Modal>

      <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <h1 className="mb-12 hidden text-40 font-bold xl:block">Daftar Akun</h1>
        <div className="mb-5 flex flex-col justify-between gap-11 xl:flex-row xl:pr-80">
          <div className="flex justify-between">
            <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24">
              Total Akun
            </p>
            <p className="text-16 font-semibold text-kText xl:text-24">
              {`${data.length} Akun`}
            </p>
          </div>
          <Button
            onClick={() => setShowTambahAkun(true)}
            text={"Tambah Akun +"}
            type={"button"}
            style={"primary"}
          />
        </div>
        <div className="flex grow flex-col rounded-lg bg-white py-3 shadow-card xl:mx-80">
          <div className="mb-5 flex w-full items-center justify-between gap-1 px-3">
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
          <div className="mt-8 flex w-full grow flex-col items-center justify-between px-3 lg:flex-row lg:items-end">
            <p className="hidden lg:block">
              Menunjukkan Entri 1 sampai xx dari xx
            </p>
            <Paginate totalPages={10} />
            <p className="block text-12 text-kText lg:hidden lg:text-16">
              Menunjukkan Entri 1 sampai xx dari xx
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DaftarAkun;
