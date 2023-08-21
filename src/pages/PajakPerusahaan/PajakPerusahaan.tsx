import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import CardPajakPerusahaan from "./CardPajakPerusahaan";
import { FormatRupiah } from "@arismun/format-rupiah";
import { BiSolidPencil } from "react-icons/bi";
import { HiTrash } from "react-icons/hi";
import { IconContext } from "react-icons";
import { dataMonth } from "../../data/month";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import TextField from "../../components/TextField";
import LoadingPage from "../../components/LoadingPage";
import { getWithAuth, postWithAuth } from "../../api/api";
import { toastError, toastSuccess } from "../../components/Toast";
import moment from "moment";

function PajakPerusahaan() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadPendapatan, setIsLoadPendapatan] = useState(true);
  const [isLoadKoreksi, setIsLoadKoreksi] = useState(true);
  const [isLoadPengeluaran, setIsLoadPengeluaran] = useState(true);

  const [showTambahKoreksi, setShowTambahKoreksi] = useState(false);
  const [showUpdateKoreksi, setShowUpdateKoreksi] = useState(false);
  const [showHapusKoreksi, setShowHapusKoreksi] = useState(false);

  const [koreksiPositifData, setKoreksiPositifData] = useState<any>([]);
  const [koreksiNegatifData, setKoreksiNegatifData] = useState<any>([]);

  const [totalKoreksiPositif, setTotalKoreksiPositif] = useState(0);
  const [totalKoreksiNegatif, setTotalKoreksiNegatif] = useState(0);
  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [totalDummyPendapatan, setTotalDummyPendapatan] = useState(0);
  const [totalDummyPengeluaran, setTotalDummyPengeluaran] = useState(0);
  
  const [onSelectedPendapatan, setOnSelectedPendapatan] = useState<Array<string>>([]);
  const [onSelectedPengeluaran, setOnSelectedPengeluaran] = useState<Array<string>>([]);

  const [kategoriPendapatan, setKategoriPendapatan] = useState<
    Array<{ value: number; label: string }>
  >([]);
  const [dataPendapatan, setDataPendapatan] = useState([]);
  const [kategoriPengeluaran, setKategoriPengeluaran] = useState<
    Array<{ value: number; label: string }>
  >([]);
  const [dataPengeluaran, setDataPengeluaran] = useState([]);

  const [sifat, setSifat] = useState("POSITIF");
  const [jenis, setJenis] = useState("");
  const [jumlah, setJumlah] = useState(0);
  const [selectedId, setSelectedId] = useState(0);

  const [isAddKoreksi, setIsAddKoreksi] = useState(false);
  const [isUpdateKoreksi, setIsUpdateKoreksi] = useState(false);
  const [isHapusKoreksi, setIsHapusKoreksi] = useState(false);
  const [pph, setPph] = useState(0);

  const [period, setPeriod] = useState<{ value: string; label: string }>();

  const countPph = () => {
    const laba =
      1000 *
      Math.floor(
        (totalDummyPendapatan -
          totalKoreksiNegatif +
          (totalKoreksiPositif - totalDummyPengeluaran)) /
          1000
      );

    if (laba < 4800000000) {
      setPph(laba * 0.11);
    } else if (laba < 50000000000) {
      setPph((laba - 4800000000) * 0.22);
    } else {
      setPph(laba * 0.22);
    }
  };

  const Load = () => {
    return (
      <>
        <div className="mb-3 flex h-5 w-full justify-between">
          <div className="w-2/5 animate-pulse bg-kGrey-100"></div>
          <div className="w-1/4 animate-pulse bg-kGrey-100"></div>
        </div>
      </>
    );
  };

  const KoreksiCard = ({ row }: { row: any }) => {
    return (
      <div className="mb-4 flex justify-between xl:gap-5">
        <p className=" w-2/5 xl:w-full">{row.jenis_koreksi}</p>
        <div className=" flex w-3/5 justify-end gap-3">
          <span className=" w-3/5 break-words text-end lg:w-full xl:w-full">
            <FormatRupiah value={row.jumlah} />
            ,-
          </span>
          <button
            onClick={() => {
              setShowUpdateKoreksi(true);
              setJenis(row.jenis_koreksi);
              setJumlah(row.jumlah);
              setSifat(row.sifat_koreksi);
              setSelectedId(row.id);
            }}
          >
            <BiSolidPencil />
          </button>
          <IconContext.Provider
            value={{ color: "red", className: "global-class-name" }}
          >
            <button
              onClick={() => {
                setShowHapusKoreksi(true);
                setSelectedId(row.id);
                setSifat(row.sifat_koreksi);
              }}
            >
              <HiTrash />
            </button>
          </IconContext.Provider>
        </div>
      </div>
    );
  };

  const token = localStorage.getItem("access_token");

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
    // updatedKategoriPendapatan.map((row:any) => {
    //   console.log(row.value > 0);
    //   if (row.value > 0){
    //     setOnSelectedPendapatan([...onSelectedPendapatan, row.label as string])
    //   } 
    //   else {
    //     setOnSelectedPendapatan([...onSelectedPendapatan])
    //   }
    // })
    // console.log(onSelectedPendapatan);
    setOnSelectedPendapatan(prevSelected => {
      const updatedSelected = updatedKategoriPendapatan
        .filter(row => row.value > 0)
        .map(row => row.label);
      return updatedSelected;
    });
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
      // console.log(updatedKategoriPengeluaran);
      setKategoriPengeluaran(updatedKategoriPengeluaran);

      setOnSelectedPengeluaran(prevSelected => {
        const updatedSelected = updatedKategoriPengeluaran
          .filter(row => row.value > 0)
          .map(row => row.label);
        return updatedSelected;
      });
    };
    
  const getKoreksi = async (sifat: string) => {
    setIsLoadKoreksi(true);
    if (token) {
      try {
        const koreksi = await getWithAuth(
          token,
          "koreksi?sifat_koreksi=" + sifat
        );
        if (sifat == "POSITIF") {
          setKoreksiPositifData(koreksi?.data?.data?.table);
          setTotalKoreksiPositif(koreksi?.data?.data?.total_koreksi);
        } else {
          setKoreksiNegatifData(koreksi?.data?.data?.table);
          setTotalKoreksiNegatif(koreksi?.data?.data?.total_koreksi);
        }
      } catch (error) {
        toastError("Get Some Data Failed");
      } finally {
        setIsLoadKoreksi(false);
      }
    }
  };

  const getTotalPendapatan = async () => {
    setIsLoadPendapatan(true);
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
            return { value:0 , label: data.nama };
          })
        );
        setTotalPendapatan(pendapatan.data.data.total_pendapatan);
        setTotalDummyPendapatan(pendapatan.data.data.total_pendapatan);
      } catch (error) {
        toastError("Get Some Data Failed");
      } finally {
        setIsLoading(false);
        setIsLoadPendapatan(false);
      }
    }
  };

  const getTotalPengeluaran = async () => {
    setIsLoadPengeluaran(true);
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
        setTotalDummyPengeluaran(pengeluaran.data.data.total_pengeluaran);
      } catch (error) {
        toastError("Get Some Data Failed");
      } finally {
        setIsLoading(false);
        setIsLoadPengeluaran(false);
      }
    }
  };

  const tambahKoreksi = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddKoreksi(true);
    if (token) {
      try {
        const response = await postWithAuth(
          "koreksi",
          {
            sifat_koreksi: sifat,
            jenis_koreksi: jenis,
            jumlah: jumlah,
          },
          token ?? ""
        );
        toastSuccess(response.data.meta.message);
        setShowTambahKoreksi(false);
        if (sifat == "POSITIF") {
          setTotalKoreksiPositif(totalKoreksiPositif + 1);
        } else {
          setTotalKoreksiNegatif(totalKoreksiNegatif + 1);
        }
      } catch (error) {
        toastError((error as any).response.data.data.error as string);
      } finally {
        setIsAddKoreksi(false);
      }
    }
  };

  const updateKoreksi = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdateKoreksi(true);
    if (token) {
      try {
        const response = await postWithAuth(
          "update-koreksi",
          {
            id: selectedId,
            sifat_koreksi: sifat,
            jenis_koreksi: jenis,
            jumlah: jumlah,
          },
          token ?? ""
        );
        toastSuccess(response.data.meta.message);
        setShowUpdateKoreksi(false);
        if (sifat == "POSITIF") {
          setTotalKoreksiPositif(totalKoreksiPositif + 1);
        } else {
          setTotalKoreksiNegatif(totalKoreksiNegatif + 1);
        }
      } catch (error) {
        toastError((error as any).response.data.data.error as string);
      } finally {
        setIsUpdateKoreksi(false);
      }
    }
  };

  const hapusKoreksi = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsHapusKoreksi(true);
    try {
      const response = await postWithAuth(
        "delete-koreksi",
        {
          id: selectedId,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowHapusKoreksi(false);
      if (sifat == "POSITIF") {
        setTotalKoreksiPositif(totalKoreksiPositif + 1);
      } else {
        setTotalKoreksiNegatif(totalKoreksiNegatif + 1);
      }
    } catch (error) {
      toastError((error as any).response.data.meta.message as string);
    } finally {
      setIsHapusKoreksi(false);
    }
  };

  const handleCheck = (label: string, isChecked:boolean, value:number, tipe: string) => {
    var temppendapatan = totalDummyPendapatan
    var temppengeluaran = totalDummyPengeluaran
    if(tipe=="pendapatan"){
      if (!isChecked) {
        setOnSelectedPendapatan([...onSelectedPendapatan, label]);
        setTotalDummyPendapatan(temppendapatan + value)
      } else {
        setOnSelectedPendapatan(onSelectedPendapatan.filter((item) => item !== label));
        setTotalDummyPendapatan(temppendapatan - value)
      }
      // console.log(onSelectedPendapatan)
    } else {
      if (!isChecked) {
        setOnSelectedPengeluaran([...onSelectedPengeluaran, label]);
        setTotalDummyPengeluaran(temppengeluaran + value)
      } else {
        setOnSelectedPengeluaran(onSelectedPengeluaran.filter((item) => item !== label));
        setTotalDummyPengeluaran(temppengeluaran - value)
      }
      // console.log(onSelectedPendapatan)

    }
  };

  useEffect(() => {
    getTotalPendapatan();
    getTotalPengeluaran();
  }, [period]);

  useEffect(() => {
    countPph();
  }, [totalDummyPendapatan, totalDummyPengeluaran]);

  useEffect(() => {
    pendapatanPerKategori();
  }, [totalPendapatan]);

  useEffect(() => {
    pengeluaranPerKategori();
  }, [totalPengeluaran]);

  useEffect(() => {
    getKoreksi("POSITIF");
  }, [totalKoreksiPositif]);

  useEffect(() => {
    getKoreksi("NEGATIF");
  }, [totalKoreksiNegatif]);

  return (
    <>
      <LoadingPage isLoad={isLoading} />

      <Modal
        visible={showTambahKoreksi}
        onClose={() => setShowTambahKoreksi(false)}
      >
        <form
          onSubmit={(e) => tambahKoreksi(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Koreksi
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full items-center justify-between gap-16 xl:flex">
              <div className=" xl:w-1/2">
                <p className="mb-2 text-16 font-semibold">Jenis Koreksi</p>
                <TextField
                  required
                  placeholder="Jenis Koreksi"
                  type="standart"
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                />
              </div>
              <div className="xl:w-1/2">
                <p className="mb-2 text-16 font-semibold">Jumlah Koreksi</p>
                <TextField
                  required
                  type={"standart"}
                  label={""}
                  placeholder={"Rp"}
                  helpertext={""}
                  value={jumlah}
                  onChange={(e) => setJumlah(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => {
                setShowTambahKoreksi(false);
                setJenis("");
                setJumlah(0);
              }}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Tambah Data"}
              type={"submit"}
              style={"primary"}
              isLoading={isAddKoreksi}
            />
          </div>
        </form>
      </Modal>

      <Modal
        visible={showUpdateKoreksi}
        onClose={() => setShowUpdateKoreksi(false)}
      >
        <form
          onSubmit={(e) => updateKoreksi(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Koreksi
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full items-center justify-between gap-16 xl:flex">
              <div className=" xl:w-1/2">
                <p className="mb-2 text-16 font-semibold">Jenis Koreksi</p>
                <TextField
                  required
                  placeholder="Jenis Koreksi"
                  type="standart"
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                />
              </div>
              <div className="xl:w-1/2">
                <p className="mb-2 text-16 font-semibold">Jumlah Koreksi</p>
                <TextField
                  required
                  type={"standart"}
                  label={""}
                  placeholder={"Rp"}
                  helpertext={""}
                  value={jumlah}
                  onChange={(e) => setJumlah(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => {
                setShowUpdateKoreksi(false);
                setJenis("");
                setJumlah(0);
              }}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Update Data"}
              type={"submit"}
              style={"primary"}
              isLoading={isUpdateKoreksi}
            />
          </div>
        </form>
      </Modal>

      <Modal
        visible={showHapusKoreksi}
        onClose={() => setShowHapusKoreksi(false)}
      >
        <form
          onSubmit={(e) => hapusKoreksi(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Hapus Koreksi
          </h1>
          <p className="mb-5 w-full text-center text-12 xl:text-left xl:text-16">
            Apakah Anda yakin menghapus data?
          </p>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowHapusKoreksi(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              isLoading={isHapusKoreksi}
              text={"Hapus Data"}
              type={"submit"}
              style={"primary"}
            />
          </div>
        </form>
      </Modal>

      <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <div className="xl:flex xl:justify-between xl:pr-16">
          <h1 className="hidden text-40 font-bold xl:block">
            Pajak Perusahaan
          </h1>
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
        <div className="mt-10 grid-cols-2 gap-x-12 xl:grid">
          <div className="rounded-[10px] bg-white p-[30px] drop-shadow-card">
            <div className=" md:flex md:justify-between ">
              <p className="text-20 font-bold">Total Pendapatan</p>
              <span className="text-20">
                <FormatRupiah value={totalDummyPendapatan} />
                ,-
              </span>
            </div>

            <hr className=" mb-4 mt-1 h-[2px] bg-kGrey-100" />
            {kategoriPendapatan.map((row: { value: number; label: string }) => {
              var isChecked = onSelectedPendapatan.includes(row.label)
              if (isLoadPendapatan) {
                return <Load />;
              }
              return <CardPajakPerusahaan label={row.label} value={row.value} isChecked={isChecked} onClick={() => handleCheck(row.label, isChecked, row.value, "pendapatan")} />
            }
            )}
          </div>
          <div className="rounded-[10px] bg-white p-[30px] drop-shadow-card">
            <div className=" md:flex md:justify-between ">
              <p className="text-20 font-bold">Total Pengeluaran</p>
              <span className="text-20">
                <FormatRupiah value={totalDummyPengeluaran} />
                ,-
              </span>
            </div>
            <hr className=" mb-4 mt-1 h-[2px] bg-kGrey-100" />
            {kategoriPengeluaran.map((row: { value: number; label: string }) => {
              var isChecked = onSelectedPengeluaran.includes(row.label)
              if (isLoadPengeluaran) {
                return <Load />;
              }
              return <CardPajakPerusahaan label={row.label} value={row.value} isChecked={isChecked} onClick={() => handleCheck(row.label, isChecked, row.value, "pengeluaran")} />
            }
            )}
          </div>
        </div>
        <div className=" mt-3 w-full rounded-[10px] bg-white p-[30px] drop-shadow-card xl:mx-auto xl:w-fit">
          <div className=" xl:flex xl:items-center xl:gap-9">
            <p className=" text-20 font-bold">Laba Sebelum Pajak</p>
            <span className="text-20">
              <FormatRupiah value={totalDummyPendapatan - totalDummyPengeluaran} />
              ,-
            </span>
          </div>
          <div className=" mt-[25px]">
            <div className=" gap-10 xl:flex xl:justify-between">
              <div className="">
                <div className="flex items-center justify-between gap-3">
                  <p className=" text-20 font-bold">Koreksi Positif</p>
                  <Button
                    style="text"
                    type="button"
                    text="Tambah Koreksi"
                    onClick={() => {
                      setShowTambahKoreksi(true);
                      setSifat("POSITIF");
                    }}
                  />
                </div>
                {koreksiPositifData.map((row: any) =>
                  isLoadKoreksi ? <Load /> : <KoreksiCard row={row} />
                )}
              </div>
              <div className="">
                <div className="mt-6 flex items-center justify-between xl:mt-0">
                  <p className=" text-20 font-bold">Koreksi Negatif</p>
                  <Button
                    style="text"
                    type="button"
                    text="Tambah Koreksi"
                    onClick={() => {
                      setShowTambahKoreksi(true);
                      setSifat("NEGATIF");
                    }}
                  />
                </div>
                {koreksiNegatifData.map((row: any) =>
                  isLoadKoreksi ? <Load /> : <KoreksiCard row={row} />
                )}
              </div>
            </div>
            <div className=" mt-6">
              <p className="text-20 font-bold">Laba Bersih Fiskal</p>
              <span className="text-20">
                <FormatRupiah
                  value={
                    totalDummyPendapatan -
                    totalKoreksiNegatif +
                    (totalKoreksiPositif - totalDummyPengeluaran)
                  }
                />
                ,-
              </span>
            </div>
            <div className=" mt-6">
              <p className="text-20 font-bold">Pembulatan</p>
              <span className="text-20">
                <FormatRupiah
                  value={
                    1000 *
                    Math.floor(
                      (totalDummyPendapatan -
                        totalKoreksiNegatif +
                        (totalKoreksiPositif - totalDummyPengeluaran)) /
                        1000
                    )
                  }
                />
                ,-
              </span>
            </div>
            <div className=" mt-6">
              <p className="text-20 font-bold">PPH</p>
              <span className="text-20">
                <FormatRupiah value={pph} />
                ,-
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PajakPerusahaan;
