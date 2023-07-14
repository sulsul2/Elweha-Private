import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import Paginate from "../../components/Paginate";
import Table from "../../components/Table";
import TextField from "../../components/TextField";

function DaftarAkun() {
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
          <Button text={"Tambah Akun +"} type={"button"} style={"primary"} />
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
