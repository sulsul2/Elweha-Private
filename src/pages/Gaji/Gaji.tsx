import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Paginate from "../../components/Paginate";
import Table from "../../components/Table";
import TextField from "../../components/TextField";
import Modal from "../../components/Modal";
import LoadingPage from "../../components/LoadingPage";
import { toastError, toastSuccess } from "../../components/Toast";
import { getWithAuth, postWithAuth, postWithAuthJson } from "../../api/api";
import { FormatRupiah } from "@arismun/format-rupiah";
import { dataMonth } from "../../data/month";
import { readEmt, readNonEmt } from "../../data/excelToJson";
import Filter from "../../components/Filter";
import UploadFile from "../../components/UploadFile";
import * as XLSX from "xlsx";
import { formatRpReverse } from "../../data/formatRp";
import { perhitungan } from "../../data/perhitunganGaji";
import { UserContext } from "../../Context/UserContext";
import NotFound from "../../components/NotFound";

function Gaji() {
  //Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isTableLoad, setIsTableLoad] = useState(false);
  const [isAddGaji, setIsAddGaji] = useState(false);
  const [isEditGaji, setIsEditGaji] = useState(false);
  const [isHapusGaji, setIsHapusGaji] = useState(false);
  const [isUploadEMT, setIsUploadEMT] = useState(false);
  const [isUploadNonEMT, setIsUploadNonEMT] = useState(false);

  // PopUp
  const [showTambahGaji, setShowTambahGaji] = useState(false);
  const [showEditGaji, setShowEditGaji] = useState(false);
  const [showHapusGaji, setShowHapusGaji] = useState(false);
  const [showEMT, setShowEMT] = useState(false);
  const [showNonEMT, setShowNonEMT] = useState(false);

  // Dropdown
  const [jenisGajiData] = useState<Array<{ value: string; label: string }>>([
    { value: "0", label: "Tetap" },
    { value: "1", label: "Variabel" },
  ]);

  //Field
  const [period, setPeriod] = useState<{ value: string; label: string }>(
    dataMonth(new Date(), new Date())[0]
  );
  const [namaKaryawan, setNamaKaryawan] = useState("");
  const [jenisGaji, setJenisGaji] = useState<{
    value: string;
    label: string;
  }>();
  const [besarGaji, setBesarGaji] = useState("");
  const [searchGaji, setSearchGaji] = useState("");

  // Excel
  const [emt, setEmt] = useState<File | null>(null);
  const [nonEmt, setNonEmt] = useState<File | null>(null);

  // Data
  const [dataGaji, setDataGaji] = useState([]);
  const [totalGaji, setTotalGaji] = useState(0);

  // Table
  const [pageGaji, setPageGaji] = useState(1);
  const [totalPageGaji, setTotalPageGaji] = useState(1);
  const [totalDataGaji, setTotalDataGaji] = useState(0);
  const [idEditGaji, setIdEditGaji] = useState(-1);
  const [gajiFilter, setGajiFilter] = useState<Array<number>>([0, 1]);
  const [onSelectedGaji, setOnSelectedGaji] = useState<Array<number>>([]);
  const kolom = [
    "No",
    "Nama Karyawan",
    "Jenis Gaji",
    "Besar Gaji",
    "Kehadiran",
    "Terlambat",
    "Bonus Kehadiran",
    "Variabel Bonus",
    "Variabel Skil",
    "PPH Dipotong",
    "Total Gaji",
  ];

  const { user } = useContext(UserContext);
  const token = user?.token;
  if (user?.role != "BOD") {
    return <NotFound />;
  }

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
    var filter = "&jenis[2]=KOSONG";
    gajiFilter.forEach((id, idx) => {
      filter += `&jenis[${idx}]=${jenisGajiData[id].label}`;
    });
    if (token) {
      try {
        const gaji = await getWithAuth(
          token,
          `gaji?limit=15&search=${searchGaji}&page=${pageGaji}&month=${
            period ? period?.value.split("-")[0] : ""
          }&year=${period ? period?.value.split("-")[1] : ""}${filter}`
        );
        setDataGaji(perhitungan(gaji).hasil);
        setTotalGaji(perhitungan(gaji).total);
        setTotalPageGaji(gaji.data.data.last_page);
        setTotalDataGaji(gaji.data.data.total);
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
  }, [pageGaji, totalDataGaji, searchGaji, gajiFilter, period]);

  const tambahGaji = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddGaji(true);
    try {
      const response = await postWithAuth(
        "gaji",
        {
          nama_karyawan: namaKaryawan,
          jenis_gaji: jenisGaji?.label,
          besar_gaji: besarGaji,
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
          nama_karyawan: namaKaryawan,
          jenis_gaji: jenisGaji?.label,
          besar_gaji: besarGaji,
          tahun: period?.value.split("-")[1],
          bulan: period?.value.split("-")[0],
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowEditGaji(false);
      setTotalDataGaji(totalDataGaji + 1);
    } catch (error) {
      console.log(error);
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

  const uploadEmt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploadEMT(true);
    try {
      let selectedFile = emt;
      const fileType = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      if (selectedFile) {
        if (selectedFile && fileType.includes(selectedFile.type)) {
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload = async (e) => {
            var excelFile = e.target!.result;
            const workbook = XLSX.read(excelFile, { type: "buffer" });
            const worksheetName = workbook.SheetNames[1];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            try {
              await postWithAuthJson("kehadiran", readEmt(data), token ?? "");
              toastSuccess("Upload successfully");
              setShowEMT(false);
              setTotalDataGaji(totalDataGaji + 1);
            } catch (error) {
              toastError(error as string);
            }
          };
        } else {
          toastError("Please select only excel file types");
          setEmt(null);
        }
      } else {
        toastError("Please select your file");
      }
    } catch (error) {
      toastError("Upload file failed");
    } finally {
      setIsUploadEMT(false);
    }
  };

  const uploadNonEmt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploadNonEMT(true);
    try {
      let selectedFile = nonEmt;
      const fileType = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      if (selectedFile) {
        if (selectedFile && fileType.includes(selectedFile.type)) {
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload = async (e) => {
            var excelFile = e.target!.result;
            const workbook = XLSX.read(excelFile, { type: "buffer" });
            const worksheetName = workbook.SheetNames[2];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            try {
              await postWithAuthJson(
                "kehadiran",
                readNonEmt(data),
                token ?? ""
              );
              toastSuccess("Upload successfully");
              setShowNonEMT(false);
              setTotalDataGaji(totalDataGaji + 1);
            } catch (error) {
              toastError(error as string);
            }
          };
        } else {
          toastError("Please select only excel file types");
          setNonEmt(null);
        }
      } else {
        toastError("Please select your file");
      }
    } catch (error) {
      toastError("Upload file failed");
    } finally {
      setIsUploadNonEMT(false);
    }
  };

  return (
    <>
      <LoadingPage isLoad={isLoading} />

      {/* Upload Absen EMT */}
      <Modal visible={showEMT} onClose={() => setShowEMT(false)}>
        <form
          onSubmit={(e) => uploadEmt(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Upload File Absen EMT
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <UploadFile childToParent={(e) => setEmt(e)} />
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowEMT(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Input Data"}
              type={"submit"}
              style={"primary"}
              isLoading={isUploadEMT}
            />
          </div>
        </form>
      </Modal>

      {/* Upload Absen NON EMT */}
      <Modal visible={showNonEMT} onClose={() => setShowNonEMT(false)}>
        <form
          onSubmit={(e) => uploadNonEmt(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Upload File Absen Non-EMT
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <UploadFile childToParent={(e) => setNonEmt(e)} />
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowNonEMT(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Input Data"}
              type={"submit"}
              style={"primary"}
              isLoading={isUploadNonEMT}
            />
          </div>
        </form>
      </Modal>

      {/* Add Gaji */}
      <Modal visible={showTambahGaji} onClose={() => setShowTambahGaji(false)}>
        <form
          onSubmit={(e) => tambahGaji(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Karyawan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama Karyawan</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Masukkan Nama Karyawan"}
                onChange={(e) => setNamaKaryawan(e.target.value)}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis Gaji</p>
              <Dropdown
                required
                placeholder={"Jenis"}
                type={"Jenis"}
                options={jenisGajiData}
                onChange={(e) => setJenisGaji(e!)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between xl:flex-row xl:gap-4">
            <div className="w-full xl:w-1/2"></div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Besar Gaji</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Rp"}
                onChange={(e) => setBesarGaji(e.target.value)}
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
        </form>
      </Modal>

      {/* Edit Gaji */}
      <Modal visible={showEditGaji} onClose={() => setShowEditGaji(false)}>
        <form
          onSubmit={(e) => editGaji(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Edit Karyawan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama Karyawan</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Masukkan Nama Karyawan"}
                value={namaKaryawan}
                onChange={(e) => setNamaKaryawan(e.target.value)}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis Gaji</p>
              <Dropdown
                placeholder={"Jenis"}
                type={"Jenis"}
                options={jenisGajiData}
                value={jenisGaji}
                onChange={(e) => setJenisGaji(e!)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between xl:flex-row xl:gap-4">
            <div className="w-full xl:w-1/2"></div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Besar Gaji</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Rp"}
                value={besarGaji}
                onChange={(e) => setBesarGaji(e.target.value)}
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
        </form>
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
              value={period}
              isClearable={false}
            />
          </div>
        </div>
        <div className="my-5 flex w-full flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex w-full justify-center gap-4 md:w-auto md:justify-start">
            <Button
              onClick={() => setShowEMT(true)}
              text={"Upload Absensi (EMT)"}
              type={"button"}
              style={"third"}
            />
            <Button
              onClick={() => setShowNonEMT(true)}
              text={"Upload Absensi (Non-EMT)"}
              type={"button"}
              style={"third"}
            />
          </div>
          <Button
            onClick={() => setShowTambahGaji(true)}
            text={"Tambah Data +"}
            type={"button"}
            style={"primary"}
          />
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
                placeholder={"Cari by Nama"}
                onChange={(e) => setSearchGaji(e.target.value)}
              />
              <Filter
                onSelected={(e) => setGajiFilter(e)}
                selected={gajiFilter}
                data={jenisGajiData}
              />
            </div>
            <div
              className={`${
                onSelectedGaji.length > 0 ? "visible" : "invisible"
              }`}
            >
              <Button
                onClick={() => setShowHapusGaji(true)}
                text={"Hapus"}
                type={"button"}
                style={"delete"}
              />
            </div>
          </div>
          <Table
            data={dataGaji}
            column={kolom}
            isLoading={isTableLoad}
            page={pageGaji}
            dataLimit={15}
            onEdit={(val) => {
              setIdEditGaji((dataGaji[val] as any).id);
              setShowEditGaji(true);
              setNamaKaryawan((dataGaji[val] as any).nama_karyawan);
              setJenisGaji(
                jenisGajiData.filter(
                  (item) => item.label == (dataGaji[val] as any).jenis_gaji
                )[0]
              );
              setBesarGaji(formatRpReverse((dataGaji[val] as any).besar_gaji));
            }}
            onSelected={(val) => setOnSelectedGaji(val)}
            selected={onSelectedGaji}
            detailUrl="/detail-gaji"
          />
          <Paginate
            totalPages={totalPageGaji}
            current={(page) => setPageGaji(page)}
            totalData={totalDataGaji}
            dataLimit={15}
          />
        </div>
      </div>
    </>
  );
}

export default Gaji;
