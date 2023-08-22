import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Table from "../../components/Table";
import LoadingPage from "../../components/LoadingPage";
import { toastError } from "../../components/Toast";
import { getWithAuth } from "../../api/api";
import { dataMonth } from "../../data/month";
import moment from "moment";
import { FormatRupiah } from "@arismun/format-rupiah";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // Data
  const [dataBarang, setDataBarang] = useState([]);
  const [dataAmbil, setDataAmbil] = useState([]);

  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);

  const [kategoriPendapatan, setKategoriPendapatan] = useState<
    Array<{ value: number; label: string }>
  >([]);
  const [dataPendapatan, setDataPendapatan] = useState([]);
  const [kategoriPengeluaran, setKategoriPengeluaran] = useState<
    Array<{ value: number; label: string }>
  >([]);
  const [dataPengeluaran, setDataPengeluaran] = useState([]);

  const [hampirHabis, setHampirHabis] = useState([]);

  const [period, setPeriod] = useState<{ value: string; label: string }>();
  const data = [
    {
      id: 1,
      tanggal: "2 Mei 2023",
      no_awal: "uhuyy",
      no_akhir: 2,
      jumlah_akta: 20,
    },
    {
      id: 2,
      tanggal: "3 Mei 2023",
      no_awal: "uhuyy",
      no_akhir: 2,
      jumlah_akta: 20,
    },
    {
      id: 3,
      tanggal: "4 Juni 2023",
      no_awal: "uhuyy",
      no_akhir: 2,
      jumlah_akta: 20,
    },
  ];
  const kolom = ["No", "Tanggal", "No.Awal", "No.Akhir", "Jumlah Akta"];

  const token = localStorage.getItem("access_token");
  // const getUser = async () => {
  //   if (token) {
  //     try {
  //       const response = await getWithAuth(token, "user");
  //       const data = response.data?.data;
  //     } catch (error) {
  //       toastError((error as any).response.data.data as string);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  const pendapatanPerKategori = () => {
    const updatedKategoriPendapatan = kategoriPendapatan.map((row: any) => {
      const accumulatedValue = dataPendapatan.reduce(
        (total, row2: any) =>
          row2.kategori === row.label ? total + row2.jumlah : total,
        0
      );
      return { ...row, value: accumulatedValue };
    });

    setKategoriPendapatan(updatedKategoriPendapatan);
  };

  const pengeluaranPerKategori = () => {
    const updatedKategoriPengeluaran = kategoriPengeluaran.map((row: any) => {
      const accumulatedValue = dataPengeluaran.reduce(
        (total, row2: any) =>
          row2.kategori === row.label ? total + row2.jumlah : total,
        0
      );
      return { ...row, value: accumulatedValue };
    });
    console.log(updatedKategoriPengeluaran);
    setKategoriPengeluaran(updatedKategoriPengeluaran);
  };

  const getTotalPendapatan = async () => {
    if (token) {
      try {
        const pendapatan = await getWithAuth(
          token,
          `pendapatan?month=${period ? period?.value.split("-")[0] : ""}&year=${
            period ? period?.value.split("-")[1] : ""
          }`
        );
        setDataPendapatan(
          pendapatan.data.data.table.data.map((data: any) => {
            return {
              id: data.id,
              tanggal: moment(data.tanggal).format("DD MMMM YYYY"),
              kategori: data.kategori.nama,
              jumlah: data.jumlah,
              pengirim: data.pengirim,
              deskripsi: data.deskripsi,
            };
          })
        );
        const kategori = await getWithAuth(token, "kategori-pendapatan");
        setKategoriPendapatan(
          kategori.data.data.map((data: any) => {
            return { value: 0, label: data.nama };
          })
        );
        setTotalPendapatan(pendapatan.data.data.total_pendapatan);
      } catch (error) {
        toastError("Get Some Data Failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getTotalPengeluaran = async () => {
    if (token) {
      try {
        const pengeluaran = await getWithAuth(
          token,
          `pengeluaran?month=${
            period ? period?.value.split("-")[0] : ""
          }&year=${period ? period?.value.split("-")[1] : ""}`
        );
        setDataPengeluaran(
          pengeluaran.data.data.table.data.map((data: any) => {
            return {
              id: data.id,
              tanggal: moment(data.tanggal).format("DD MMMM YYYY"),
              kategori: data.kategori.nama,
              jumlah: data.jumlah,
              pengirim: data.pengirim,
              deskripsi: data.deskripsi,
            };
          })
        );
        const kategori = await getWithAuth(token, "kategori-pengeluaran");
        setKategoriPengeluaran(
          kategori.data.data.map((data: any) => {
            return { value: 0, label: data.nama };
          })
        );
        setTotalPengeluaran(pengeluaran.data.data.total_pengeluaran);
      } catch (error) {
        toastError("Get Some Data Failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getStok = async () => {
    if (token) {
      try {
        const barang = await getWithAuth(
          token,
          `barang?&month=${
            period ? period?.value.split("-")[0] : ""
          }&year=${
            period ? period?.value.split("-")[1] : ""
          }`
        );
        setHampirHabis(
          barang.data.data.data.filter((data: any) => data.jumlah <= 5).map((data: any) => {
            return {
              id: data.id,
              nama_barang: data.nama_barang,
              jenis: data.jenis.nama,
              jumlah: data.jumlah,
              satuan: data.satuan,
            };
          })
        );
      } catch (error) {
        toastError("Get Data Barang Table Failed");
      } 
    }
  };

  useEffect(() => {
    getTotalPendapatan();
    getTotalPengeluaran();
  }, [period]);

  useEffect(() => {
    pendapatanPerKategori();
  }, [totalPendapatan]);

  useEffect(() => {
    pengeluaranPerKategori();
  }, [totalPengeluaran]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  return (
    <>
      <LoadingPage isLoad={isLoading} />
      {/* <Navbar onLoading={(navLoad: boolean) => setNavLoad(navLoad)} /> */}
      <div className="min-h-screen w-full bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <div className="xl:flex xl:justify-between xl:pr-16">
          <h1 className="hidden text-40 font-bold xl:block">Dashboard</h1>
          <div className="flex items-center justify-between">
            <h2 className="text-16 font-bold lg:mr-10 xl:text-24">Periode</h2>
            <div className="w-[160px] md:w-[200px]">
              <Dropdown
                placeholder={"Select Period"}
                type={"month"}
                options={dataMonth(new Date("01/01/2000"), new Date())}
                onChange={(e) => setPeriod(e!)}
              />
            </div>
          </div>
        </div>
        <div className="mt-10 flex w-full flex-wrap justify-center gap-5">
          {/* PENDAPATAN */}
          <div className="h-[300px] w-full rounded-[10px] bg-white p-[30px] drop-shadow-card xl:w-[49%] xl:p-[50px] overflow-auto">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
              <h1 className="text-20 font-bold xl:text-24">Pendapatan</h1>
              <h1 className="whitespace-nowrap text-20 font-semibold text-kGreen xl:text-28 ">
                <FormatRupiah value={totalPendapatan} />
              </h1>
            </div>
            <hr className="my-3 bg-black" />
            {kategoriPendapatan.map((row: { value: number; label: string }) => (
              <div className="my-3 flex items-center justify-between">
                <h1 className="text-14 font-medium xl:text-20">{row.label}</h1>
                <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                  <FormatRupiah value={row.value} />
                </h1>
              </div>
            ))}
            <div className="mt-5 flex w-full justify-center xl:justify-end">
              <Button
                text={"Tambah Pendapatan +"}
                type={"button"}
                style={"primary"}
              />
            </div>
          </div>

          {/* PENGELUARAN */}
          <div className="h-[300px] w-full rounded-[10px] bg-white p-[30px] drop-shadow-card xl:w-[49%] xl:p-[50px] overflow-auto">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
              <h1 className="text-20 font-bold xl:text-24">Pengeluaran</h1>
              <h1 className="whitespace-nowrap text-20 font-semibold text-kRed xl:text-28 ">
                <FormatRupiah value={totalPengeluaran} />
              </h1>
            </div>
            <hr className="my-3 bg-black" />
            {kategoriPengeluaran.map(
              (row: { value: number; label: string }) => (
                <div className="my-3 flex items-center justify-between">
                  <h1 className="text-14 font-medium xl:text-20">
                    {row.label}
                  </h1>
                  <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                    <FormatRupiah value={row.value} />
                  </h1>
                </div>
              )
            )}
            <div className="mt-5 flex w-full justify-center xl:justify-end">
              <Button
                text={"Tambah Pengeluaran +"}
                type={"button"}
                style={"primary"}
              />
            </div>
          </div>

          {/* PAJAK REKAN */}
          <div className="h-[450px] w-full rounded-[10px] bg-white p-[30px] drop-shadow-card xl:w-[49%] xl:p-[50px] overflow-auto">
            <h1 className="text-20 font-bold xl:text-24">Pajak Rekan</h1>
            <hr className="my-3 bg-black" />
            <div className="my-3 flex items-center justify-between">
              <h1 className="text-14 font-semibold xl:text-20">
                No. Akta Tersisa
              </h1>
              <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                71-79, 100
              </h1>
            </div>
            <div className="my-3 flex items-center justify-between">
              <h1 className="text-14 font-semibold xl:text-20">Daftar Akta</h1>
              <Button
                text={"Tambah Data +"}
                type={"button"}
                style={"primary"}
              />
            </div>
            <div className="">
              <Table data={data} column={kolom} />
            </div>
          </div>

          {/* STOK BARANG */}
          <div className="w-full xl:w-[49%]">
            <div className="h-[300px] w-full rounded-[10px] bg-white p-[30px] drop-shadow-card xl:p-[50px] overflow-auto">
              <h1 className="text-20 font-bold xl:text-24">Stok Barang</h1>
              <hr className="my-3 bg-black" />
              <h1 className="my-3 text-14 font-semibold xl:text-20">
                Stok Hampir Habis
              </h1>

              <div className="my-3 flex items-center justify-between">
                <h1 className="text-14 font-medium xl:text-20">Meterai 1000</h1>
                <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                  1 pcs
                </h1>
              </div>
              <div className="my-3 flex items-center justify-between">
                <h1 className="text-14 font-medium xl:text-20">Galon</h1>
                <h1 className="whitespace-nowrap text-14 font-normal text-kText xl:text-20">
                  1 Galon
                </h1>
              </div>
              <div className="mt-5 flex w-full justify-center xl:justify-end">
                <Button
                  text={"Ambil Barang +"}
                  type={"button"}
                  style={"primary"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
