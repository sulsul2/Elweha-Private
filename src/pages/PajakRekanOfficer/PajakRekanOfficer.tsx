import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Paginate from "../../components/Paginate";
import Table from "../../components/Table";
import TextField from "../../components/TextField";

function PajakRekanOfficer() {
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
      <div className="w-full px-5 pt-[104px] xl:px-24">
        <h1 className="hidden text-40 font-bold xl:block">Pajak Rekan</h1>
        <div className="mb-[77px] flex flex-col justify-between gap-[14px] xl:mb-[14px] xl:mt-[52px] xl:flex-row">
          <div className="flex justify-between gap-11 xl:justify-start">
            <p className="text-16 font-bold xl:text-24">Total Pengeluaran</p>
            <p className="text-16 font-bold xl:text-24">Rp 100.000.000,-</p>
          </div>
          <div className="flex justify-between gap-11 xl:justify-start">
            <p className="text-16 font-bold xl:text-24">Periode</p>
            <Dropdown type="period" placeholder="Select Period!" />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5 xl:flex-row">
          <div className="w-full rounded-xl px-1 shadow-lg shadow-kGrey-100 xl:w-1/2">
            <div className="mb-5 mt-5 flex justify-end gap-5">
              <Button type="button" style="primary" text="Tambah Rekan +" />
            </div>
            <div className="mb-5 flex w-full items-center justify-between gap-8">
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
            <div className="mb-5 mt-5 flex justify-end gap-5">
              <Button type="button" style="primary" text="Tambah Data +" />
            </div>
            <div className="mb-5 flex w-full items-center justify-between gap-8">
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
