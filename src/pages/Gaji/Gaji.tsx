import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Paginate from "../../components/Paginate";
import Table from "../../components/Table";
import TextField from "../../components/TextField";
import Modal from "../../components/Modal";
import LoadingPage from "../../components/LoadingPage";
import { toastError, toastSuccess } from "../../components/Toast";
import { getWithAuth, postWithAuth } from "../../api/api";
import { FormatRupiah } from "@arismun/format-rupiah";
import { dataMonth } from "../../data/month";

function Gaji() {
  //Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isTableLoad, setIsTableLoad] = useState(false);
  const [isAddGaji, setIsAddGaji] = useState(false);
  const [isEditGaji, setIsEditGaji] = useState(false);
  const [isHapusGaji, setIsHapusGaji] = useState(false);

  // PopUp
  const [showTambahGaji, setShowTambahGaji] = useState(false);
  const [showEditGaji, setShowEditGaji] = useState(false);
  const [showHapusGaji, setShowHapusGaji] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // Dropdown
  const [gajiData, setGajiData] = useState<
    Array<{ value: string; label: string }>
  >([]);

  //Field
  const [period, setPeriod] = useState<{ value: string; label: string }>();
  const [gaji, setGaji] = useState<{ value: string; label: string }>();
  const [namaKaraywan, setNamaKaraywan] = useState("");
  const [jenisGaji, setJenisGaji] = useState("");
  const [jumlahGaji, setJumlahGaji] = useState("");
  const [searchGaji, setSearchGaji] = useState("");
  const [tanggal, setTanggal] = useState<Date | null>();
  const [noAwal, setNoAwal] = useState("");
  const [noAkhir, setNoAkhir] = useState("");

  // Data
  const [dataGaji, setDataGaji] = useState([]);
  const [totalGaji, setTotalGaji] = useState(0);

  // Table
  const [pageGaji, setPageGaji] = useState(1);
  const [totalPageGaji, setTotalPageGaji] = useState(1);
  const [totalDataGaji, setTotalDataGaji] = useState(0);
  const [idEditGaji, setIdEditGaji] = useState(-1);
  const [onSelectedGaji, setOnSelectedGaji] = useState<Array<number>>([]);

  const [month, setMonth] = useState("Januari 2023");
  const [showModal, setShowModal] = useState(false);
  const data = [
    {
      id: 1,
      nama: "Vixell",
      kehadiran: "50/55",
      jenis: "Tetap",
      jumlahGaji: "Rp. 5.000.000,-",
      jumlahBonus: "Rp. 200.000,-",
      pphDipotong: "Rp. 200.000,-",
      pajakAkumulasi: "Rp. 200.000,-",
      transfer: "Rp. 200.000,-",
    },
    {
      id: 2,
      nama: "Vixell",
      kehadiran: "50/55",
      jenis: "Tetap",
      jumlahGaji: "Rp. 5.000.000,-",
      jumlahBonus: "Rp. 200.000,-",
      pphDipotong: "Rp. 200.000,-",
      pajakAkumulasi: "Rp. 200.000,-",
      transfer: "Rp. 200.000,-",
    },
  ];
  const kolom = [
    "No",
    "Nama Karyawan",
    "Kehadiran",
    "Jenis Gaji",
    "Jumlah Gaji",
    "Jumlah Bonus",
    "PPH Dipotong",
    "Pajak Akumulasi",
    "Transfer",
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  const token = localStorage.getItem("access_token");
  const getData = async () => {
    if (token) {
      try {
      } catch (error) {
        toastError("Get Some Data Failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getGaji = async () => {
    setOnSelectedGaji([]);
    setIsTableLoad(true);
    if (token) {
      try {
        const gaji = await getWithAuth(
          token,
          `gaji?limit=10&page=${pageGaji}&search=${searchGaji}`
        );
        setDataGaji(
          gaji.data.data.table.data.map((data: any) => {
            return {
              id: data.id,
              nama_karyawan: data.gaji.nama_karyawan,
              kehadiran: data.gaji.kehadiran,
              jenis_gaji: data.jenis_gaji,
              jumlah_gaji: data.jumlah_gaji,
              jumlah_bonus: data.jumlah_bonus,
              pph_dipotong: data.pph_dipotong,
              pajak_akumulasi: data.pajak_akumulasi,
              transfer: data.transfer,
            };
          })
        );
        setGajiData(
          gaji.data.data.table.data.map((data: any) => {
            return {
              value: data.gaji.id,
              label: data.gaji.nama,
            };
          })
        );
        setTotalGaji(gaji.data.data.total_gaji);
        setTotalPageGaji(gaji.data.data.table.last_page);
        setTotalDataGaji(gaji.data.data.table.total);
      } catch (error) {
        toastError("Get Data Table Failed");
      } finally {
        setIsTableLoad(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getGaji();
  }, [pageGaji, totalDataGaji, searchGaji]);

  const tambahGaji = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddGaji(true);
    try {
      const response = await postWithAuth(
        "gaji",
        {
          nama_karyawan: namaKaraywan,
          jenis_gaji: jenisGaji,
          jumlah_gaji: jumlahGaji,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowTambahGaji(false);
      setTotalDataGaji(totalDataGaji + 1);
    } catch (error) {
      toastError((error as any).response.data.data.error as string);
    } finally {
      setIsAddGaji(false);
    }
  };

  const editGaji = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditGaji(true);
    try {
      const response = await postWithAuth(
        "update-gaji",
        {
          id: idEditGaji,
          nama_karyawan: namaKaraywan,
          jenis_gaji: jenisGaji,
          jumlah_gaji: jumlahGaji,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowEditGaji(false);
      setTotalDataGaji(totalDataGaji + 1);
    } catch (error) {
      toastError((error as any).response.data.data.error as string);
    } finally {
      setIsEditGaji(false);
    }
  };

  const hapusGaji = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsHapusGaji(true);
    try {
      const response = await postWithAuth(
        "delete-gaji",
        {
          selectedId: onSelectedGaji,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowHapusGaji(false);
      setTotalDataGaji(totalDataGaji + 1);
    } catch (error) {
      toastError((error as any).response.data.meta.message as string);
    } finally {
      setIsHapusGaji(false);
    }
  };

  return (
    <>
      <LoadingPage isLoad={isLoading} />

      {/* Add Gaji */}
      <Modal visible={showTambahGaji} onClose={() => setShowTambahGaji(false)}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Karyawan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama Karyawan</p>
              <TextField
                required
                type={"standart"}
                label={""}
                placeholder={"Masukkan Nama Karyawan"}
                helpertext={""}
                onChange={(e) => setNamaKaraywan(e.target.value)}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis Gaji</p>
              <Dropdown
                placeholder={"Jenis"}
                type={"Jenis"}
                options={undefined}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between xl:flex-row xl:gap-4">
            <div className="w-full xl:w-1/2"></div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jumlah Gaji</p>
              <TextField
                required
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
                onChange={(e) => setJumlahGaji(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowTambahGaji(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Tambah Data"}
              type={"submit"}
              style={"primary"}
              isLoading={isAddGaji}
            />
          </div>
        </div>
      </Modal>

      {/* Edit Gaji */}
      <Modal visible={showEditGaji} onClose={() => setShowEditGaji(false)}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Edit Karyawan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama Karyawan</p>
              <TextField
                required
                type={"standart"}
                label={""}
                placeholder={"Masukkan Nama Karyawan"}
                helpertext={""}
                onChange={(e) => setNamaKaraywan(e.target.value)}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis Gaji</p>
              <Dropdown
                placeholder={"Jenis"}
                type={"Jenis"}
                options={undefined}
                value={{ value: "Tetap", label: "Tetap" }}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between xl:flex-row xl:gap-4">
            <div className="w-full xl:w-1/2"></div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jumlah Gaji</p>
              <TextField
                required
                style={""}
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
                onChange={(e) => setJumlahGaji(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowEditGaji(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Edit Data"}
              type={"submit"}
              style={"primary"}
              isLoading={isEditGaji}
            />
          </div>
        </div>
      </Modal>

      {/* Hapus Karyawan */}
      <Modal visible={showHapusGaji} onClose={() => setShowHapusGaji(false)}>
        <form
          onSubmit={(e) => hapusGaji(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Hapus Karyawan
          </h1>
          <p className="mb-5 w-full text-center text-12 xl:text-left xl:text-16">
            Apakah Anda yakin menghapus data?
          </p>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowHapusGaji(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              isLoading={isHapusGaji}
              text={"Hapus Data"}
              type={"submit"}
              style={"primary"}
            />
          </div>
        </form>
      </Modal>

      <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <h1 className="mb-12 hidden text-40 font-bold xl:block">Gaji</h1>
        <div className="mb-5 flex w-full justify-between xl:justify-start">
          <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24">
            Total Gaji
          </p>
          <p className="text-16 font-semibold text-kText xl:text-24">
            <FormatRupiah value={totalGaji} />
          </p>
        </div>
        <div className="mb-5 flex flex-col justify-between gap-11 xl:flex-row">
          <div className="flex w-full items-center justify-between xl:justify-start">
            <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24 ">
              Periode
            </p>
            <div className="w-[160px] md:w-[200px]">
              <Dropdown
                placeholder={"Select Period"}
                type={"month"}
                options={dataMonth(new Date("01/01/2000"), new Date())}
                onChange={(e) => setPeriod(e!)}
              />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowTambahGaji(true)}
              text={"Tambah Data +"}
              type={"button"}
              style={"primary"}
            />
          </div>
        </div>
        <p className="mb-5 block text-16 font-bold xl:hidden xl:text-24">
          Daftar Gaji
        </p>
        <div className="flex grow flex-col rounded-lg bg-white py-3 shadow-card">
          <div className="mb-5 flex w-full items-center justify-between gap-1 px-3">
            <p className="hidden text-16 font-bold xl:block xl:text-24">
              Daftar Gaji
            </p>
            <div className="flex items-center gap-2">
              <TextField
                type={"search"}
                placeholder={"Cari"}
                onChange={(e) => setSearchGaji(e.target.value)}
              />
              <Button
                text={"Filter"}
                type={"button"}
                style={"seccondary"}
                onClick={() => setShowFilter(!showFilter)}
              />
              {showFilter}
            </div>
            <div
              className={`${
                onSelectedGaji.length > 0 ? "visible" : "invisible"
              }`}
            ></div>
            <Button
              onClick={() => setShowHapusGaji(true)}
              text={"Hapus"}
              type={"button"}
              style={"delete"}
            />
          </div>
          <Table
            data={dataGaji}
            column={kolom}
            isLoading={isTableLoad}
            page={pageGaji}
            dataLimit={10}
            onEdit={(val) => {
              setIdEditGaji((dataGaji[val] as any).id);
              setShowEditGaji(true);
              setNamaKaraywan((dataGaji[val] as any).nama_karyawan);
              setJenisGaji((dataGaji[val] as any).jenis_gaji);
              setJumlahGaji((dataGaji[val] as any).jumlah_gaji);
            }}
            onSelected={(val) => setOnSelectedGaji(val)}
            selected={onSelectedGaji}
          />
          <Paginate
            totalPages={totalPageGaji}
            current={(page) => setPageGaji(page)}
            totalData={totalDataGaji}
            dataLimit={10}
          />
        </div>
      </div>
    </>
  );
}

export default Gaji;
