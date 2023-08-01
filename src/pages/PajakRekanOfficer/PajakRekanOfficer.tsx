import { useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Footer from "../../components/Footer";
import Modal from "../../components/Modal";
import Navbar from "../../components/Navbar";
import Paginate from "../../components/Paginate";
import Table from "../../components/Table";
import TextField from "../../components/TextField";
import DateFieldNormal from "../../components/DateFieldNormal";

function PajakRekanOfficer() {
  const [month, setMonth] = useState("Januari 2023");
  const [showvisible1, setShowVisible1] = useState(false);
  const [showvisible2, setShowVisible2] = useState(false);
  const data1 = [
    {
      id: 1,
      nama_rekan: "Kontol",
      biaya_jasa: "10.000,-",
      jumlah_akta: 2,
    },
    {
      id: 2,
      nama_rekan: "Kontol",
      biaya_jasa: "10.000,-",
      jumlah_akta: 2,
    },
    {
      id: 3,
      nama_rekan: "Kontol",
      biaya_jasa: "10.000,-",
      jumlah_akta: 2,
    },
  ];
  const data2 = [
    {
      id: 1,
      Tanggal: "15 Juli 2023",
      no_awal: "Agus",
      no_akhir: "Kontol",
      jumlah_akta: 2,
      update_terakhir: "Vixell pada 16 Jul 2023 12:54",
    },
    {
      id: 2,
      Tanggal: "15 Juli 2023",
      no_awal: "Agus",
      no_akhir: "Kontol",
      jumlah_akta: 2,
      update_terakhir: "Vixell pada 16 Jul 2023 12:54",
    },
    {
      id: 3,
      Tanggal: "15 Juli 2023",
      no_awal: "Agus",
      no_akhir: "Kontol",
      jumlah_akta: 2,
      update_terakhir: "Vixell pada 16 Jul 2023 12:54",
    },
  ];
  const kolom1 = ["No", "Nama Rekan", "Biaya Jasa", "Jumlah Akta"];
  const kolom2 = [
    "No",
    "Tanggal",
    "No. Awal",
    "No. Akhir",
    "Jumlah Akta",
    "Update Terakhir",
  ];
  return (
    <>
      <Navbar />
      <Modal visible={showvisible1} onClose={() => setShowVisible1(false)}>
        <div className="flex w-full flex-col gap-5 xl:gap-4">
          <h1 className="text-24 xl:text-40 text-kText text-center xl:text-start font-bold">
            Tambah Rekan
          </h1>
          <TextField type="standart" label="Nama Rekan" placeholder="Placeholder" helpertext=""/>
          <TextField type="standart" label="Biaya Jasa" placeholder="Rp" helpertext=""/>
          <div className="flex justify-between gap-4">
            <Button type="submit" style="third" text="Batalkan" onClick={() => setShowVisible1(false)}/>
            <Button type="submit" style="primary" text="Tambah Rekan"/>
          </div>
        </div>
      </Modal>
      <Modal visible={showvisible2} onClose={() => setShowVisible2(false)}>
        <div className="flex w-full flex-col gap-5 xl:gap-4">
          <h1 className="text-24 xl:text-40 text-kText text-center xl:text-start font-bold">
            Tambah Akta
          </h1>
          <DateFieldNormal text="Masukkan Tanggal"/>
          <TextField type="standart" label="Nama Rekan" placeholder="Placeholder" helpertext=""/>
          <TextField type="standart" label="Biaya Jasa" placeholder="Rp" helpertext=""/>
          <div className="flex justify-between gap-4">
            <Button type="submit" style="third" text="Batalkan" onClick={() => setShowVisible2(false)}/>
            <Button type="submit" style="primary" text="Tambah Rekan"/>
          </div>
        </div>
      </Modal>
      <div className="w-full bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <h1 className="mb-12 hidden text-40 font-bold xl:block">Pajak Rekan</h1>
        <div className="mb-[77px] flex flex-col justify-between gap-[14px] xl:mb-[14px] xl:mt-[52px] xl:flex-row">
          <div className="flex justify-between gap-11 xl:justify-start">
            <p className="text-16 font-bold xl:text-24">Total Pengeluaran</p>
            <p className="text-16 font-bold xl:text-24">Rp 100.000.000,-</p>
          </div>
          <div className="flex items-center justify-between gap-11 xl:justify-start">
            <p className="text-16 font-bold xl:text-24">Periode</p>
            <div className="w-[160px] md:w-[200px] drop-shadow-button">
              <Dropdown type="period" placeholder="Select Period" options={undefined} value={month} />  
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-5 xl:flex-row">
          <div className="w-full rounded-xl px-1 shadow-lg bg-white shadow-kGrey-100 xl:w-1/2">
            <div className="mb-5 mt-5 flex justify-end gap-5 px-3">
              <Button type="button" style="primary" text="Tambah Rekan +" onClick={() => setShowVisible1(true)}/>
            </div>
            <div className="mb-5 flex w-full items-center justify-between gap-8 px-3">
              <p className="hidden text-16 font-bold xl:block xl:text-20">
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
          <div className="w-full rounded-xl px-1 shadow-lg shadow-kGrey-100 xl:w-1/2">
            <div className="mb-5 mt-5 flex justify-end gap-5 px-3">
              <Button type="button" style="primary" text="Tambah Data +" onClick={() => setShowVisible2(true)}/>
            </div>
            <div className="mb-5 flex w-full items-center justify-between gap-8 px-3">
              <p className="hidden text-16 font-bold xl:block xl:text-20">
                Daftar Akta
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

export default PajakRekanOfficer;
