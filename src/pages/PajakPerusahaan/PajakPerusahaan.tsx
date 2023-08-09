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

function PajakPerusahaan() {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [koreksiPositifData, setKoreksiPositifData] = useState<any>([]);
  const [koreksiNegatifData, setKoreksiNegatifData] = useState<any>([]);
  const [totalKoreksiPositif, setTotalKoreksiPositif] = useState(0);
  const [totalKoreksiNegatif, setTotalKoreksiNegatif] = useState(0);

  const [sifat, setSifat] = useState("POSITIF");
  const [jenis, setJenis] = useState("");
  const [jumlah, setJumlah] = useState(0);
  const [selectedId,setSelectedId] = useState(0);

  const [isAddKoreksi, setIsAddKoreksi] = useState(false);
  const [isHapusKoreksi, setIsHapusKoreksi] = useState(false);

  const [period, setPeriod] = useState<{ value: string; label: string }>();

  const KoreksiCard = ({ id,jenis, value }: { id:number, jenis: string; value: number }) => {
    return (
      <div className="mb-4 flex justify-between xl:gap-5">
        <p className=" w-2/5 xl:w-full">{jenis}</p>
        <div className=" flex w-3/5 justify-end gap-3">
          <span className=" w-3/5 break-words text-end lg:w-full xl:w-full">
            <FormatRupiah value={value} />
            ,-
          </span>
          <button
            onClick={() => {
              setShowModal(true);
              setJenis(jenis);
              setJumlah(value);
            }}
          >
            <BiSolidPencil />
          </button>
          <IconContext.Provider
            value={{ color: "red", className: "global-class-name" }}
          >
            <button onClick={() => {hapusKoreksi();setSelectedId(id)}}>
              <HiTrash />
            </button>
          </IconContext.Provider>
        </div>
      </div>
    );
  };
  // const koreksiType = [
  //   { value: "Positif", label: "Positif" },
  //   { value: "Negatif", label: "Negatif" },
  // ];
  const token = localStorage.getItem("access_token");
  const getKoreksi = async (sifat: string) => {
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
        setIsLoading(false);
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
        setShowModal(false);
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

  const hapusKoreksi = async () => {
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

  useEffect(() => {
    getKoreksi("POSITIF");
  }, [totalKoreksiPositif]);

  useEffect(() => {
    getKoreksi("NEGATIF");
  }, [totalKoreksiNegatif]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  return (
    <>
      <LoadingPage isLoad={isLoading} />

      <Modal visible={showModal} onClose={() => setShowModal(false)}>
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
                  placeholder="Jenis Koreksi"
                  type="standart"
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                />
              </div>
              <div className="xl:w-1/2">
                <p className="mb-2 text-16 font-semibold">Jumlah Koreksi</p>
                <TextField
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
              onClick={() => setShowModal(false)}
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
                <FormatRupiah value={100000000000} />
                ,-
              </span>
            </div>

            <hr className=" mb-4 mt-1 h-[2px] bg-kGrey-100" />
            <CardPajakPerusahaan label={"Jenis 1"} value={100000000000} />
            <CardPajakPerusahaan
              label={"Jenis Lain Kalo Ada"}
              value={100000000000}
            />
          </div>
          <div className="rounded-[10px] bg-white p-[30px] drop-shadow-card">
            <div className=" md:flex md:justify-between ">
              <p className="text-20 font-bold">Total Pengeluaran</p>
              <span className="text-20">
                <FormatRupiah value={100000000000} />
                ,-
              </span>
            </div>
            <hr className=" mb-4 mt-1 h-[2px] bg-kGrey-100" />
            <CardPajakPerusahaan label={"Jenis 1"} value={100000000000} />
            <CardPajakPerusahaan
              label={"Jenis Lain Kalo Ada"}
              value={100000000000}
            />
          </div>
        </div>
        <div className=" mt-3 w-full rounded-[10px] bg-white p-[30px] drop-shadow-card xl:mx-auto xl:w-fit">
          <div className=" xl:flex xl:items-center xl:gap-9">
            <p className=" text-20 font-bold">Laba Sebelum Pajak</p>
            <span className="text-20">
              <FormatRupiah value={100000000000} />
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
                      setShowModal(true);
                      setSifat("POSITIF");
                    }}
                  />
                </div>
                {koreksiPositifData.map((row: any) => (
                  <KoreksiCard value={row.jumlah} jenis={row.jenis_koreksi} id={row.id} />
                ))}
              </div>
              <div className="">
                <div className="mt-6 flex items-center justify-between xl:mt-0">
                  <p className=" text-20 font-bold">Koreksi Negatif</p>
                  <Button
                    style="text"
                    type="button"
                    text="Tambah Koreksi"
                    onClick={() => {
                      setShowModal(true);
                      setSifat("NEGATIF");
                    }}
                  />
                </div>
                {koreksiNegatifData.map((row: any) => (
                  <KoreksiCard value={row.jumlah} jenis={row.jenis_koreksi} id={row.id} />
                ))}
              </div>
            </div>
            <div className=" mt-6">
              <p className="text-20 font-bold">Laba Bersih Fiskal</p>
              <span className="text-20">
                <FormatRupiah value={100000000000} />
                ,-
              </span>
            </div>
            <div className=" mt-6">
              <p className="text-20 font-bold">Pembulatan</p>
              <span className="text-20">
                <FormatRupiah value={100000000000} />
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
