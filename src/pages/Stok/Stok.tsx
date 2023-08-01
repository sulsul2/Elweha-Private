import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Paginate from "../../components/Paginate";
import Table from "../../components/Table";
import TextField from "../../components/TextField";
import LoadingPage from "../../components/LoadingPage";
import Modal from "../../components/Modal";
import DateFieldNormal from "../../components/DateFieldNormal";

function Stok() {
  const [isLoading, setIsLoading] = useState(true);
  const [navLoad, setNavLoad] = useState(true);
  const [month, setMonth] = useState("Januari 2023");
  const [showvisible1, setShowVisible1] = useState(false);
  const [showvisible2, setShowVisible2] = useState(false);
  const [showvisible3, setShowVisible3] = useState(false);
  const [showvisible4, setShowVisible4] = useState(false);
  const [showvisible5, setShowVisible5] = useState(false);
  const data1 = [
    {
      id: 1,
      Barang: "Kontol",
      jenis: "kopeng",
      jumlah: 2,
      satuan: 1,
    },
    {
      id: 2,
      Barang: "Kontol",
      jenis: "kopeng",
      jumlah: 2,
      satuan: 1,
    },
    {
      id: 3,
      Barang: "Kontol",
      jenis: "kopeng",
      jumlah: 2,
      satuan: 1,
    },
  ];
  const data2 = [
    {
      id: 1,
      Tanggal: "15 Juli 2023",
      Nama: "Agus",
      Barang: "Kontol",
      jenis: "kopeng",
      jumlah: 2,
      satuan: 1,
    },
    {
      id: 2,
      Tanggal: "15 Juli 2023",
      Nama: "Agus",
      Barang: "Kontol",
      jenis: "kopeng",
      jumlah: 2,
      satuan: 1,
    },
    {
      id: 3,
      Tanggal: "15 Juli 2023",
      Nama: "Agus",
      Barang: "Kontol",
      jenis: "kopeng",
      jumlah: 2,
      satuan: 1,
    },
  ];
  const kolom1 = ["No", "Barang", "Jenis", "Jumlah", "Satuan"];
  const kolom2 = [
    "No",
    "Tanggal",
    "Nama",
    "Barang",
    "Jenis",
    "Jumlah",
    "Satuan",
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  return (
    <>
      <LoadingPage isLoad={navLoad || isLoading} />
      <Navbar
        active={4}
        onLoading={(navLoad: boolean) => setNavLoad(navLoad)}
      />
      <Modal visible={showvisible1} onClose={() => setShowVisible1(false)}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Ambil Barang
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Tanggal</p>
              <DateFieldNormal text="Pick a Date!"/>
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis Barang</p>
              <Dropdown
                placeholder={"Jenis"}
                type={"Jenis"}
                options={undefined}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between xl:flex-row xl:gap-4">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama Pengambil</p>
              <TextField
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              /> 
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jumlah Barang</p>
              <TextField
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between xl:flex-row xl:gap-4">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama Barang</p>
              <TextField
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              /> 
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Satuan</p>
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
              onClick={() => setShowVisible1(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button text={"Tambah Data"} type={"button"} style={"primary"} />
          </div>
        </div>
      </Modal>
      <Modal visible={showvisible2} onClose={() => setShowVisible2(false)}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Edit Ambil Barang
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Tanggal</p>
              <DateFieldNormal text="Pick a Date!"/>
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis Barang</p>
              <Dropdown
                placeholder={"Jenis"}
                type={"Jenis"}
                options={undefined}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between xl:flex-row xl:gap-4">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama Pengambil</p>
              <TextField
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              /> 
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jumlah Barang</p>
              <TextField
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between xl:flex-row xl:gap-4">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama Barang</p>
              <TextField
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              /> 
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Satuan</p>
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
              onClick={() => setShowVisible2(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button text={"Simpan Data"} type={"button"} style={"primary"} />
          </div>
        </div>
      </Modal>
      <Modal visible={showvisible3} onClose={() => setShowVisible3(false)}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Edit Barang
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
          <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama Barang</p>
              <TextField
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              /> 
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis Barang</p>
              <Dropdown
                placeholder={"Jenis"}
                type={"Jenis"}
                options={undefined}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between xl:flex-row xl:gap-4">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jumlah Barang</p>
              <TextField
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              /> 
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Satuan</p>
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
              onClick={() => setShowVisible3(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button text={"Simpan Data"} type={"button"} style={"primary"} />
          </div>
        </div>
      </Modal>
      <Modal visible={showvisible4} onClose={() => setShowVisible4(false)}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Barang
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
          <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama Barang</p>
              <TextField
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              /> 
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis Barang</p>
              <Dropdown
                placeholder={"Jenis"}
                type={"Jenis"}
                options={undefined}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between xl:flex-row xl:gap-4">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jumlah Barang</p>
              <TextField
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              /> 
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Satuan</p>
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
              onClick={() => setShowVisible4(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button text={"Tambah Data"} type={"button"} style={"primary"} />
          </div>
        </div>
      </Modal>
      <div className="w-full bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <h1 className="mb-12 hidden text-40 font-bold xl:block">Stok</h1>
        <div className="flex w-full items-center justify-between xl:justify-start">
          <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24 ">
            Periode
          </p>
          <div className="w-[160px] md:w-[200px]">
            <Dropdown
              placeholder={""}
              type={"month"}
              value={month}
              options={undefined}
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-5 xl:flex-row">
          <div className="flex w-full flex-col rounded-xl bg-white shadow-card xl:w-1/2">
            <div className="mb-5 mt-5 flex justify-end gap-5 px-3">
              <Button type="button" style="primary" text="Tambah Barang +" />
              <Button type="button" style="third" text="Tambah Jenis +" />
            </div>
            <div className="mb-5 flex w-full items-center justify-between gap-8 px-3">
              <p className="hidden text-16 font-bold xl:block xl:text-20">
                Daftar Barang
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
            <Table data={data1} column={kolom1} />
            <div className="mb-4 mt-8 flex w-full grow flex-col items-center justify-between px-5 lg:flex-row lg:items-end">
              <p className="hidden lg:block">
                Menunjukkan Entri 1 sampai xx dari xx
              </p>
              <Paginate totalPages={10} />
              <p className="block text-12 text-kText lg:hidden lg:text-16">
                Menunjukkan Entri 1 sampai xx dari xx
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col rounded-xl bg-white shadow-card xl:w-1/2">
            <div className="mb-5 mt-5 flex justify-end gap-5 px-3">
              <Button type="button" style="primary" text="Ambil Stok" />
            </div>
            <div className="mb-5 flex w-full items-center justify-between gap-8 px-3">
              <p className="hidden text-16 font-bold xl:block xl:text-20">
                Daftar Pengambil
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
            <Table data={data2} column={kolom2} />
            <div className="mb-4 mt-8 flex w-full grow flex-col items-center justify-between px-5 lg:flex-row lg:items-end">
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
      </div>
      <Footer />
    </>
  );
}

export default Stok;
